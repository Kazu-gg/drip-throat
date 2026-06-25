"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useCampaignTheme } from "@/components/campaign/CampaignThemeProvider";

function createSoftParticleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function HeroParticles3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useCampaignTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    const count = isMobile ? 180 : 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 8;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const texture = createSoftParticleTexture();
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(theme.particle),
      size: isMobile ? 0.04 : 0.03,
      map: texture ?? undefined,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      points.rotation.y += 0.0004;
      points.rotation.x += 0.00015;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      texture?.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [theme.particle]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[2] opacity-70"
      aria-hidden
    />
  );
}
