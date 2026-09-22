"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 grainUv = uv * max(uGrainScale, 0.001);
  if (uGrainAnimated > 0.5) { grainUv += vec2(iTime * 0.05); }
  float grain = fract(sin(dot(grainUv, vec2(12.9898, 78.233))) * 43758.5453);
  float g = (grain - 0.5) * uGrainAmount;
  fragColor = vec4(g, g, g, abs(g));
}
`;

export default function Grain({
  amount = 0.12,
  scale = 1.5,
  animated = false,
}: {
  amount?: number;
  scale?: number;
  animated?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uGrainAmount: { value: amount },
        uGrainScale: { value: scale },
        uGrainAnimated: { value: animated ? 1.0 : 0.0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      const res = (program.uniforms.iResolution as { value: Float32Array }).value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
    };

    // Static grain only needs one draw (plus redraws on resize). Skip the
    // per-frame loop unless the grain is animated and motion is allowed.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loopEnabled = animated && !reduceMotion;

    let raf = 0;
    const t0 = performance.now();
    const draw = (t: number) => {
      (program.uniforms.iTime as { value: number }).value = (t - t0) * 0.001;
      renderer.render({ scene: mesh });
    };
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      setSize();
      if (!loopEnabled) draw(performance.now());
    });
    ro.observe(container);
    setSize();

    if (loopEnabled) raf = requestAnimationFrame(loop);
    else draw(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      try { container.removeChild(canvas); } catch { /* ignore */ }
    };
  }, [amount, scale, animated]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "overlay",
        opacity: 0.6,
      }}
    />
  );
}
