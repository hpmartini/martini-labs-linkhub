
import React, { useEffect, useRef, useState } from 'react';

// Check if mobile/low-power device
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{x: number, y: number} | null>(null);
  const [isMobile] = useState(isMobileDevice);

  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const mousePosRef = useRef<{x: number, y: number} | null>(null);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    // Grid Configuration
    const fov = 300;
    const camHeight = 120; // Camera height above ground
    const gridSize = isMobile ? 60 : 40; // Larger cells on mobile = fewer lines
    const speed = isMobile ? 0.5 : 1.0; // Slower on mobile

    // Frame rate limiting for mobile (target 30fps instead of 60)
    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const loop = (timestamp: number = 0) => {
      // Skip frames on mobile to reduce CPU load
      if (isMobile && timestamp - lastFrameTime < frameInterval) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }
      lastFrameTime = timestamp;
        if (!ctx || !canvas) return;
        const width = canvas.width;
        const height = canvas.height;
        
        // Update offset (Move grid towards camera)
        offsetRef.current = (offsetRef.current + speed) % gridSize;
        const offset = offsetRef.current;

        // Clear Canvas
        ctx.clearRect(0, 0, width, height);

        // Helper: Project World(x, z) to Screen(x, y)
        // World Coordinates: x (left/right), z (depth, 0 is camera, +inf is horizon)
        // Screen Coordinates: x (0..width), y (0..height)
        // Horizon is at y=0.
        // We render z from near plane to horizon.
        const project = (wx: number, wz: number) => {
            if (wz <= 0) return null; // Behind camera
            const scale = fov / wz;
            const sx = wx * scale + width / 2;
            const sy = camHeight * scale; 
            return { x: sx, y: sy };
        };

        // --- DRAW GRID LINES ---
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineCap = 'round';

        // 1. Horizontal Lines (Lines of constant Z)
        // We draw from closest Z to furthest.
        // Closest Z corresponds to screen bottom (y = height).
        // sy = camHeight * fov / z => z = camHeight * fov / sy
        // Min Z to render:
        const minZ = (camHeight * fov) / height;
        const maxZ = 2000; // Horizon draw distance

        // Start from offset to keep lines moving
        // We want lines at world Z = k * gridSize - offset
        // Find first k such that z >= minZ
        let startK = Math.floor((minZ + offset) / gridSize);
        
        ctx.beginPath();
        for (let k = startK; ; k++) {
            const z = k * gridSize - offset;
            if (z > maxZ) break;
            
            // Project left and right infinity (or visible range)
            // Visible width at depth z: w = z * width / fov
            // Let's draw wide enough to cover screen rotation or wide monitors
            const visibleX = (width / 2) * z / fov;
            const p1 = project(-visibleX * 1.5, z);
            const p2 = project(visibleX * 1.5, z);

            if (p1 && p2) {
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }
        }
        ctx.stroke();

        // 2. Vertical Lines (Lines of constant X)
        // Radiate from vanishing point (width/2, 0)
        // Range of X lines to draw?
        const xRange = 2000; // World units left/right
        ctx.beginPath();
        for (let x = -xRange; x <= xRange; x += gridSize) {
             // Draw from minZ to maxZ
             // But simpler: just draw from Vanishing Point to Bottom Screen projected X
             // Point at maxZ (Horizon) -> effectively (width/2, 0) for x=0, but x varies.
             // Actually, projection of (x, infinity) is (width/2, 0) ONLY if x is finite relative to inf? 
             // Ideally: (x, maxZ) to (x, minZ)
             
             const pNear = project(x, minZ);
             const pFar = project(x, maxZ);

             if (pNear && pFar) {
                 ctx.moveTo(pNear.x, pNear.y);
                 ctx.lineTo(pFar.x, pFar.y);
             }
        }
        ctx.stroke();


        // --- DRAW HIGHLIGHT ---
        // Mouse interaction
        const mPos = mousePosRef.current;
        if (mPos) {
            // Inverse Project Mouse to World
            // sy = mPos.y. 
            // z = camHeight * fov / sy
            // But we need to handle y=0 case (horizon)
            if (mPos.y > 5) { // Avoid division by zero or infinity
                const zWorld = (camHeight * fov) / mPos.y;
                
                // sx = xWorld * scale + width/2
                // xWorld = (sx - width/2) / scale = (sx - width/2) * zWorld / fov
                const xWorld = (mPos.x - width / 2) * zWorld / fov;

                // Identify Cell
                // Note: The grid lines are at Z = k*gridSize - offset.
                // We need to find the "k" (row) and "j" (col).
                // zWorld = row * gridSize - offset (approx)
                // row = (zWorld + offset) / gridSize
                const col = Math.floor(xWorld / gridSize);
                const row = Math.floor((zWorld + offset) / gridSize);

                // Cell Corners in World Space
                const cellX_min = col * gridSize;
                const cellX_max = (col + 1) * gridSize;
                // row corresponds to the line at the START of the cell (closest to camera? no, Z increases away)
                // If zWorld increases away, and lines are k*gridSize - offset.
                // index row covers Z from (row*gridSize - offset) to ((row+1)*gridSize - offset)
                const cellZ_min = row * gridSize - offset;
                const cellZ_max = (row + 1) * gridSize - offset;

                // Project Corners
                const c1 = project(cellX_min, cellZ_min); // Near Left
                const c2 = project(cellX_max, cellZ_min); // Near Right
                const c3 = project(cellX_max, cellZ_max); // Far Right
                const c4 = project(cellX_min, cellZ_max); // Far Left

                if (c1 && c2 && c3 && c4) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(c1.x, c1.y);
                    ctx.lineTo(c2.x, c2.y);
                    ctx.lineTo(c3.x, c3.y);
                    ctx.lineTo(c4.x, c4.y);
                    ctx.closePath();
                    
                    // Fill
                    ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
                    ctx.fill();
                    
                    // Glow Stroke
                    ctx.shadowColor = '#00ffff';
                    ctx.shadowBlur = 15;
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#00ffff';
                    ctx.stroke();
                    
                    ctx.restore();
                }
            }
        }
        
        // Vignette / Fade at horizon (Optional manual fade if CSS mask fails)
        // We let CSS handle the heavy vignette but we can fade lines alpha by Z if we wanted.

        animationRef.current = requestAnimationFrame(loop);
    }
    // Start animation after a brief delay to prioritize initial render
    const startTimeout = setTimeout(() => loop(0), isMobile ? 500 : 0);
    return () => {
      clearTimeout(startTimeout);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // We need coordinate relative to the canvas drawing surface.
    // e.nativeEvent.offsetX/Y gives coordinates relative to the element padding box.
    // We just need to scale if the internal resolution differs from display size.
    // In our case, we set width/height based on window.
    // CSS sets width: 100%, height: 100% of parent.
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Use clientX - rect.left for robustness across browsers vs offsetX
    // Since we aren't transforming the canvas with CSS 3D anymore, this is safe.
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setMousePos({ x, y });
  };

  const [size, setSize] = useState({ w: 1920, h: 1080 });

  useEffect(() => {
     const updateSize = () => {
         const parent = document.querySelector('.grid-container-wrapper');
         if (parent) {
             // Limit DPR on mobile to reduce canvas size (major perf gain)
             const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
             setSize({
                 w: parent.clientWidth * dpr,
                 h: parent.clientHeight * dpr
             });
         } else {
             const dpr = isMobile ? 1 : 2;
             setSize({ w: window.innerWidth * dpr, h: window.innerHeight });
         }
     }
     window.addEventListener('resize', updateSize);
     // Delay slightly to ensure layout is done
     setTimeout(updateSize, 0);
     return () => window.removeEventListener('resize', updateSize);
  }, [isMobile]);

  return (
    <canvas 
        ref={canvasRef}
        width={size.w}
        height={size.h}
        className="retro-grid w-full h-full pointer-events-auto cursor-crosshair block"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos(null)}
        style={{ width: '100%', height: '100%' }} // Ensure CSS matches parent
    />
  );
};

export const SynthwaveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#050505]">
      
      {/* 1. SKY (Top 65%) */}
      <div className="absolute top-0 left-0 w-full h-[65%] bg-gradient-to-b from-[#120824] via-[#240b36] to-[#451055] overflow-hidden">
        {/* Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_0)] [background-size:60px_60px] opacity-40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_0)] [background-size:120px_120px] opacity-20 animate-pulse"></div>
        
        {/* The Sun */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] sun flex flex-col justify-end items-center gap-[2px] pb-[10%]"></div>

        {/* --- MOUNTAINS --- */}
        <div className="absolute bottom-0 left-0 w-full h-[45%] z-0 opacity-40">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
             <path fill="#2d1b4e" d="M0 120 L0 80 Q 300 30 600 80 T 1200 70 V 120 Z" />
           </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[40%] z-5 opacity-70">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
             <path fill="#240b36" d="M0 120 L0 100 C 120 70, 240 40, 360 80 C 480 120, 600 60, 720 90 C 840 120, 960 40, 1080 70 L 1200 100 V 120 Z" />
           </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[35%] z-10">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
             <defs>
               <linearGradient id="mountain-grad" x1="0" x2="0" y1="0" y2="1">
                 <stop offset="0%" stopColor="#1a0b2e" />
                 <stop offset="100%" stopColor="#000" />
               </linearGradient>
             </defs>
             <path fill="url(#mountain-grad)" 
                   d="M0 120 L0 70 
                      C 60 40, 120 20, 180 60 
                      C 240 100, 300 80, 360 90 
                      C 420 100, 480 95, 540 105 
                      C 600 115, 660 105, 720 95 
                      C 780 85, 840 90, 900 60 
                      C 960 30, 1020 10, 1080 50 
                      C 1140 90, 1170 80, 1200 90 
                      V 120 Z" />
           </svg>
        </div>
        
        <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-[#ff00ff44] to-transparent z-20 blur-2xl"></div>
      </div>

      {/* 2. GROUND (Bottom 35%) */}
      <div className="absolute bottom-0 left-0 w-full h-[35%] bg-[#08020a]">
        
        {/* === LASER HORIZON BEAM === */}
        <div className="absolute top-0 left-0 w-full h-0 z-50 flex items-center justify-center">
          <div className="absolute top-[-1px] left-0 w-full h-[2px] bg-cyan-100 shadow-[0_0_15px_#00ffff] opacity-90 mix-blend-screen"></div>
          <div className="absolute top-[-30px] w-[50vw] max-w-[600px] h-[60px] bg-[radial-gradient(closest-side,rgba(0,255,255,0.6)_0%,rgba(0,255,255,0)_100%)] blur-xl mix-blend-screen"></div>
          <div className="absolute top-[-10px] w-[25vw] max-w-[300px] h-[20px] bg-[radial-gradient(closest-side,#ffffff_50%,rgba(0,255,255,0)_100%)] blur-md mix-blend-screen shadow-[0_0_30px_rgba(0,255,255,0.8)]"></div>
        </div>

        {/* Manual 2D Canvas Grid with Perspective Math */}
        {/* Wrapper class for size detection */}
        <div className="grid-container-wrapper w-full h-full relative z-10">
            <GridCanvas />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,#000000_90%)] z-20 pointer-events-none"></div>
      </div>
      
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] z-50 pointer-events-none opacity-60"></div>

    </div>
  );
};
