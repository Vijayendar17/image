"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropperProps {
  imageSrc: string;
  aspectRatio?: number; // width / height
  onCropChange: (crop: Crop) => void;
}

export default function ImageCropper({ imageSrc, aspectRatio, onCropChange }: ImageCropperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [crop, setCrop] = useState<Crop>({ x: 10, y: 10, width: 80, height: 80 }); 
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<string | null>(null);
  const startPos = useRef({ x: 0, y: 0, cropX: 0, cropY: 0, cropW: 0, cropH: 0, panX: 0, panY: 0 });

  const handleImageLoad = () => {
    setImgLoaded(true);
    if (aspectRatio && imgRef.current) {
      const imgW = imgRef.current.width;
      const imgH = imgRef.current.height;
      const currentAR = imgW / imgH;
      let w = 80;
      let h = (w / currentAR) * (1 / aspectRatio);
      if (h > 80) {
        h = 80;
        w = h * currentAR * aspectRatio;
      }
      const newCrop = { x: (100 - w) / 2, y: (100 - h) / 2, width: w, height: h };
      setCrop(newCrop);
      updateParent(newCrop, zoom, pan);
    }
  };

  const updateParent = (c: Crop, z: number, p: {x: number, y: number}) => {
    // We pass a "virtual crop" that accounts for zoom/pan
    // but to keep it simple for now, let's just pass the raw values
    // and we'll handle the math in processPhoto
    onCropChange({ ...c, zoom: z, panX: p.x, panY: p.y } as any);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent, type: string) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setDragType(type);
    startPos.current = { 
      x: clientX, 
      y: clientY, 
      cropX: crop.x, 
      cropY: crop.y, 
      cropW: crop.width, 
      cropH: crop.height,
      panX: pan.x,
      panY: pan.y
    };
  };

  const onDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = ((clientX - startPos.current.x) / rect.width) * 100;
    const dy = ((clientY - startPos.current.y) / rect.height) * 100;

    if (dragType === 'pan') {
      const px = clientX - startPos.current.x;
      const py = clientY - startPos.current.y;
      setPan({ x: startPos.current.panX + px, y: startPos.current.panY + py });
    } else {
      setCrop(prev => {
        let next = { ...prev };
        if (dragType === 'move') {
          next.x = Math.max(0, Math.min(100 - prev.width, startPos.current.cropX + dx));
          next.y = Math.max(0, Math.min(100 - prev.height, startPos.current.cropY + dy));
        } else if (dragType) {
          if (dragType.includes('e')) next.width = Math.max(5, Math.min(100 - prev.x, startPos.current.cropW + dx));
          if (dragType.includes('w')) {
            const newW = Math.max(5, startPos.current.cropW - dx);
            if (startPos.current.cropX + startPos.current.cropW - newW >= 0) {
              next.width = newW;
              next.x = startPos.current.cropX + startPos.current.cropW - newW;
            }
          }
          if (dragType.includes('s')) next.height = Math.max(5, Math.min(100 - prev.y, startPos.current.cropH + dy));
          if (dragType.includes('n')) {
            const newH = Math.max(5, startPos.current.cropH - dy);
            if (startPos.current.cropY + startPos.current.cropH - newH >= 0) {
              next.height = newH;
              next.y = startPos.current.cropY + startPos.current.cropH - newH;
            }
          }
          if (aspectRatio && imgRef.current) {
            const imgAR = imgRef.current.width / imgRef.current.height;
            if (dragType.includes('e') || dragType.includes('w')) {
              next.height = next.width * imgAR * (1 / aspectRatio);
              if (next.y + next.height > 100) {
                next.height = 100 - next.y;
                next.width = next.height * (1 / imgAR) * aspectRatio;
              }
            } else {
              next.width = next.height * (1 / imgAR) * aspectRatio;
              if (next.x + next.width > 100) {
                next.width = 100 - next.x;
                next.height = next.width * imgAR * (1 / aspectRatio);
              }
            }
          }
        }
        return next;
      });
    }
  }, [isDragging, dragType, aspectRatio]);

  const endDrag = useCallback(() => {
    setIsDragging(false);
    setDragType(null);
    updateParent(crop, zoom, pan);
  }, [crop, zoom, pan]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('touchmove', onDrag, { passive: false });
      window.addEventListener('touchend', endDrag);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', endDrag);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', endDrag);
    };
  }, [isDragging, onDrag, endDrag]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
      <div 
        ref={containerRef}
        className="crop-container"
        style={{ 
          position: 'relative', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          lineHeight: 0,
          width: '100%',
          userSelect: 'none',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#111',
          border: '1px solid var(--border)',
          aspectRatio: '4/3',
          cursor: dragType === 'pan' ? 'grabbing' : 'grab'
        }}
        onMouseDown={(e) => !isDragging && startDrag(e, 'pan')}
        onTouchStart={(e) => !isDragging && startDrag(e, 'pan')}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          ref={imgRef}
          src={imageSrc} 
          alt="To crop" 
          onLoad={handleImageLoad}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%',
            display: 'block',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        />
        
        {imgLoaded && (
          <>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', pointerEvents: 'none' }} />
            <div 
              style={{
                position: 'absolute',
                top: `${crop.y}%`,
                left: `${crop.x}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.65)',
                cursor: 'move',
                border: '2px solid #fff',
                zIndex: 10
              }}
              onMouseDown={(e) => { e.stopPropagation(); startDrag(e, 'move'); }}
              onTouchStart={(e) => { e.stopPropagation(); startDrag(e, 'move'); }}
            >
              {/* Grid Lines */}
              <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.4)' }} />
              <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.4)' }} />
              <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.4)' }} />
              <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.4)' }} />

              {['nw', 'ne', 'sw', 'se'].map(h => (
                <div
                  key={h}
                  onMouseDown={(e) => { e.stopPropagation(); startDrag(e, h); }}
                  onTouchStart={(e) => { e.stopPropagation(); startDrag(e, h); }}
                  style={{
                    position: 'absolute',
                    width: '16px',
                    height: '16px',
                    background: '#fff',
                    border: '2px solid #ff6b35',
                    borderRadius: '50%',
                    zIndex: 11,
                    ...(h.includes('n') ? { top: '-8px' } : { bottom: '-8px' }),
                    ...(h.includes('w') ? { left: '-8px' } : { right: '-8px' }),
                    cursor: `${h}-resize`
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>🔍 Zoom</span>
        <input 
          type="range" 
          min="1" 
          max="4" 
          step="0.01" 
          value={zoom} 
          onChange={(e) => {
            const newZoom = parseFloat(e.target.value);
            setZoom(newZoom);
            updateParent(crop, newZoom, pan);
          }}
          style={{ flex: 1, accentColor: '#ff6b35', height: '6px', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '40px', textAlign: 'right', color: 'var(--brand-primary)' }}>{Math.round(zoom * 100)}%</span>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '-0.25rem' }}>
        💡 Drag the image to move · Use handles to crop · Scroll/Slide to zoom
      </p>
    </div>
  );
}
