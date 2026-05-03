"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
  zoom?: number;
  panX?: number;
  panY?: number;
  naturalW?: number;
  naturalH?: number;
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
  const [imgAspectRatio, setImgAspectRatio] = useState<string>('4/3');
  const [naturalW, setNaturalW] = useState(800);
  const [naturalH, setNaturalH] = useState(600);
  const [crop, setCrop] = useState<Crop>({ x: 10, y: 10, width: 80, height: 80 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<string | null>(null);
  const startPos = useRef({ x: 0, y: 0, cropX: 0, cropY: 0, cropW: 0, cropH: 0, panX: 0, panY: 0 });

  const handleImageLoad = () => {
    if (!imgRef.current) return;
    const nw = imgRef.current.naturalWidth;
    const nh = imgRef.current.naturalHeight;
    setNaturalW(nw);
    setNaturalH(nh);
    // Clamp to reasonable display bounds: max 16/9, min 1/2
    const ar = nw / nh;
    const clampedAr = Math.min(Math.max(ar, 0.5), 16 / 9);
    setImgAspectRatio(`${clampedAr}`);
    setImgLoaded(true);

    if (aspectRatio) {
      // Initialize crop box to match target aspect ratio
      const containerAR = clampedAr;
      // crop box dimensions in % of container
      let w = 80;
      let h = (w / containerAR) * (1 / aspectRatio) * containerAR;
      // Simpler: the crop box percent width/height represent fractions of the container
      // Target aspect ratio in container-space:
      // (w% * containerW) / (h% * containerH) = aspectRatio
      // => w/h = aspectRatio * containerH / containerW = aspectRatio / containerAR
      h = w * (1 / aspectRatio) / containerAR;
      // h should be expressed as % of containerH, w as % of containerW
      // Actually let's think in terms of the container pixel space:
      // w_px = w% * containerW, h_px = h% * containerH
      // w_px / h_px = w% * containerW / (h% * containerH) = (w/h) * containerAR = targetAR
      // So: w/h = targetAR / containerAR
      const ratio = aspectRatio / clampedAr;
      w = 80;
      h = w / ratio;
      if (h > 90) { h = 90; w = h * ratio; }
      if (w > 90) { w = 90; h = w / ratio; }

      const newCrop = { x: (100 - w) / 2, y: (100 - h) / 2, width: w, height: h };
      setCrop(newCrop);
      updateParent(newCrop, 1, { x: 0, y: 0 }, nw, nh);
    }
  };

  const updateParent = useCallback((
    c: Crop,
    z: number,
    p: { x: number; y: number },
    nw: number = naturalW,
    nh: number = naturalH
  ) => {
    onCropChange({ ...c, zoom: z, panX: p.x, panY: p.y, naturalW: nw, naturalH: nh });
  }, [onCropChange, naturalW, naturalH]);

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
      setPan({ x: startPos.current.panX + (clientX - startPos.current.x), y: startPos.current.panY + (clientY - startPos.current.y) });
    } else {
      setCrop(prev => {
        const next = { ...prev };
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

          // Maintain target aspect ratio if provided, but ONLY for corner handles
          if (aspectRatio && dragType.length === 2) {
            const containerAR = naturalW / naturalH;
            // (w_px/h_px) = aspectRatio => (w%*cW)/(h%*cH) = aspectRatio => w/h = aspectRatio/containerAR
            const ratio = aspectRatio / containerAR;
            if (dragType.includes('e') || dragType.includes('w')) {
              next.height = next.width / ratio;
              if (next.y + next.height > 100) {
                next.height = 100 - next.y;
                next.width = next.height * ratio;
              }
            } else {
              next.width = next.height * ratio;
              if (next.x + next.width > 100) {
                next.width = 100 - next.x;
                next.height = next.width / ratio;
              }
            }
          }
        }
        return next;
      });
    }
  }, [isDragging, dragType, aspectRatio, naturalW, naturalH]);

  const endDrag = useCallback(() => {
    setIsDragging(false);
    setDragType(null);
    updateParent(crop, zoom, pan);
  }, [crop, zoom, pan, updateParent]);

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
          aspectRatio: imgAspectRatio,
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
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', pointerEvents: 'none' }} />
            <div
              style={{
                position: 'absolute',
                top: `${crop.y}%`,
                left: `${crop.x}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
                cursor: 'move',
                border: '2px solid #fff',
                zIndex: 10
              }}
              onMouseDown={(e) => { e.stopPropagation(); startDrag(e, 'move'); }}
              onTouchStart={(e) => { e.stopPropagation(); startDrag(e, 'move'); }}
            >
              {/* Rule-of-thirds grid */}
              <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }} />

              {/* Handles */}
              {['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'].map(h => (
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
                    ...(h.includes('n') ? { top: '-8px' } : h.includes('s') ? { bottom: '-8px' } : { top: 'calc(50% - 8px)' }),
                    ...(h.includes('w') ? { left: '-8px' } : h.includes('e') ? { right: '-8px' } : { left: 'calc(50% - 8px)' }),
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
        <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '40px', textAlign: 'right', color: '#ff6b35' }}>{Math.round(zoom * 100)}%</span>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '-0.25rem' }}>
        💡 Drag the image to move · Drag corners to resize crop · Slide to zoom
      </p>
    </div>
  );
}
