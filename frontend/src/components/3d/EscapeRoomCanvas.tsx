'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, Zap, Info, Layers } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

export type EnvironmentTheme = 'CYBER_VAULT' | 'SUBMARINE' | 'HOSPITAL_ICU' | 'SMART_CITY';

interface EscapeRoomCanvasProps {
  onObjectClick?: (objectName: string) => void;
  stage?: number;
  environmentTheme?: EnvironmentTheme;
}

export default function EscapeRoomCanvas({ onObjectClick, stage = 1, environmentTheme = 'CYBER_VAULT' }: EscapeRoomCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<EnvironmentTheme>(environmentTheme);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Theme Color Palettes
    const bgColorMap = {
      CYBER_VAULT: 0x050b14,
      SUBMARINE: 0x021727,
      HOSPITAL_ICU: 0x061e24,
      SMART_CITY: 0x14051e,
    };

    const lightColorMap = {
      CYBER_VAULT: 0x00f0ff,
      SUBMARINE: 0x38bdf8,
      HOSPITAL_ICU: 0x10b981,
      SMART_CITY: 0xf59e0b,
    };

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColorMap[activeTheme]);
    scene.fog = new THREE.FogExp2(bgColorMap[activeTheme], 0.04);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 3, 9);
    camera.lookAt(0, 1, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x1a2638, 1.5);
    scene.add(ambientLight);

    const primaryPointLight = new THREE.PointLight(lightColorMap[activeTheme], 3, 15);
    primaryPointLight.position.set(-3, 4, 2);
    scene.add(primaryPointLight);

    const purpleLight = new THREE.PointLight(0xaa00ff, 3, 15);
    purpleLight.position.set(3, 4, 2);
    scene.add(purpleLight);

    const spotLight = new THREE.SpotLight(0xff0055, 4, 15, Math.PI / 6, 0.5);
    spotLight.position.set(0, 6, 0);
    spotLight.target.position.set(0, 0, -4);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // 5. Grid Floor & Room Geometry
    const gridHelper = new THREE.GridHelper(20, 20, lightColorMap[activeTheme], 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090f1e,
      roughness: 0.4,
      metalness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const wallGeo = new THREE.PlaneGeometry(20, 10);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0c1527, roughness: 0.7 });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 5, -5);
    scene.add(backWall);

    // 6. Interactive 3D Escape Room Objects
    const interactiveMeshes: THREE.Mesh[] = [];

    // --- Object A: Solenoid Vault Door ---
    const vaultDoorGeo = new THREE.BoxGeometry(4, 5, 0.4);
    const vaultDoorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: lightColorMap[activeTheme],
      emissiveIntensity: stage >= 4 ? 0.8 : 0.1,
    });
    const vaultDoor = new THREE.Mesh(vaultDoorGeo, vaultDoorMat);
    vaultDoor.position.set(0, 2.5, -4.8);
    vaultDoor.name = 'Solenoid Vault Door';
    scene.add(vaultDoor);
    interactiveMeshes.push(vaultDoor);

    const torusGeo = new THREE.TorusGeometry(0.8, 0.12, 16, 32);
    const torusMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9 });
    const vaultWheel = new THREE.Mesh(torusGeo, torusMat);
    vaultWheel.position.set(0, 2.5, -4.5);
    scene.add(vaultWheel);

    // --- Object B: RFID Keycard Terminal ---
    const rfidGeo = new THREE.BoxGeometry(1.2, 2.2, 0.8);
    const rfidMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x10b981,
      emissiveIntensity: stage >= 1 ? 0.6 : 0.2,
    });
    const rfidTerminal = new THREE.Mesh(rfidGeo, rfidMat);
    rfidTerminal.position.set(-4, 1.1, -1);
    rfidTerminal.name = 'RFID Keycard Terminal';
    scene.add(rfidTerminal);
    interactiveMeshes.push(rfidTerminal);

    // --- Object C: A* Search Mainframe ---
    const serverGeo = new THREE.BoxGeometry(1.5, 3.5, 1.2);
    const serverMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      emissive: 0x6366f1,
      emissiveIntensity: stage >= 2 ? 0.7 : 0.2,
    });
    const serverRack = new THREE.Mesh(serverGeo, serverMat);
    serverRack.position.set(4, 1.75, -1);
    serverRack.name = 'A* Search Navigation Mainframe';
    scene.add(serverRack);
    interactiveMeshes.push(serverRack);

    // --- Object D: Neural Network Terminal ---
    const holoGeo = new THREE.CylinderGeometry(0.8, 0.8, 1, 32);
    const holoMat = new THREE.MeshStandardMaterial({
      color: 0x312e81,
      emissive: 0x818cf8,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.85,
    });
    const holoTerminal = new THREE.Mesh(holoGeo, holoMat);
    holoTerminal.position.set(-1.8, 0.5, 1.5);
    holoTerminal.name = 'Neural Network Hologram Terminal';
    scene.add(holoTerminal);
    interactiveMeshes.push(holoTerminal);

    const sphereGeo = new THREE.IcosahedronGeometry(0.5, 2);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: lightColorMap[activeTheme],
      wireframe: true,
      emissive: lightColorMap[activeTheme],
      emissiveIntensity: 0.8,
    });
    const holoSphere = new THREE.Mesh(sphereGeo, sphereMat);
    holoSphere.position.set(-1.8, 1.8, 1.5);
    scene.add(holoSphere);

    // --- Object E: SQL Database Console ---
    const dbGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const dbMat = new THREE.MeshStandardMaterial({
      color: 0x7c2d12,
      emissive: 0xf97316,
      emissiveIntensity: 0.6,
    });
    const dbConsole = new THREE.Mesh(dbGeo, dbMat);
    dbConsole.position.set(1.8, 0.6, 1.5);
    dbConsole.name = 'SQL Medical Record Recovery Console';
    scene.add(dbConsole);
    interactiveMeshes.push(dbConsole);

    // 7. Floating Dust Particles
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = Math.random() * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: lightColorMap[activeTheme],
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. Raycasting & Mouse Interaction Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hitName = intersects[0].object.name;
        setHoveredObject(hitName);
        document.body.style.cursor = 'pointer';
      } else {
        setHoveredObject(null);
        document.body.style.cursor = 'default';
      }
    };

    const handlePointerClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        soundEngine.playClick();
        const hitName = intersects[0].object.name;
        setSelectedObject(hitName);
        if (onObjectClick) onObjectClick(hitName);
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', handlePointerMove);
    domElement.addEventListener('click', handlePointerClick);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      vaultWheel.rotation.z = elapsedTime * 0.2;
      holoSphere.rotation.y = elapsedTime * 0.8;
      holoSphere.position.y = 1.8 + Math.sin(elapsedTime * 2) * 0.08;

      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += Math.sin(elapsedTime + i) * 0.002;
        if (positions[i] > 6) positions[i] = 0;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(elapsedTime * 0.3) * 0.4;
      camera.lookAt(0, 1.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousemove', handlePointerMove);
      domElement.removeEventListener('click', handlePointerClick);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onObjectClick, stage, activeTheme]);

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.15)] bg-slate-950">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Overlay */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center space-x-2">
        <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center space-x-2 backdrop-blur-md">
          <Eye className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>3D WebGL Viewport: Interactivity Active</span>
        </div>
      </div>

      {/* Environment Scene Switcher Overlay */}
      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 backdrop-blur-md">
        {[
          { id: 'CYBER_VAULT', label: 'Vault' },
          { id: 'SUBMARINE', label: 'Submarine' },
          { id: 'HOSPITAL_ICU', label: 'Hospital' },
          { id: 'SMART_CITY', label: 'SmartCity' },
        ].map((env) => (
          <button
            key={env.id}
            onClick={() => {
              soundEngine.playClick();
              setActiveTheme(env.id as any);
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
              activeTheme === env.id
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {env.label}
          </button>
        ))}
      </div>

      {/* Hover Object Banner */}
      {hoveredObject && (
        <div className="absolute top-14 right-4 pointer-events-none px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-mono font-bold flex items-center space-x-2 backdrop-blur-md animate-pulse">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>CLICK TO INSPECT: {hoveredObject.toUpperCase()}</span>
        </div>
      )}

      {/* Bottom Hint Bar */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-between items-center text-[11px] font-mono text-slate-400 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click glowing 3D consoles to open interactive puzzle visualizers</span>
        </div>
        <div className="flex space-x-3">
          <span className="text-emerald-400">● RFID Scanner</span>
          <span className="text-indigo-400">● A* Mainframe</span>
          <span className="text-cyan-400">● Neural Net</span>
          <span className="text-amber-400">● SQL Console</span>
        </div>
      </div>
    </div>
  );
}
