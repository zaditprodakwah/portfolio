"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  RotateCw,
  RefreshCw,
  BookOpen,
  Book,
  Package,
  Layers,
  ZoomIn,
  ZoomOut,
  Compass,
  FileText,
  Sparkles,
  Volume2,
  VolumeX,
  Upload,
  Sliders,
  Check,
  Eye,
  X,
} from "lucide-react";

interface InteractiveModelViewerProps {
  fallbackImage?: string;
}

type MaterialType = "kraft" | "black" | "white";
type BookFinishType = "doff" | "glossy" | "linen";

export default function InteractiveBookViewer({
  fallbackImage = "/editorial-studio/hero-mockup-3d.png",
}: InteractiveModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [modelType, setModelType] = useState<"book" | "box" | "stacked">("book");
  const [materialType, setMaterialType] = useState<MaterialType>("kraft");
  const [bookFinish, setBookFinish] = useState<BookFinishType>("doff");
  const [isBoxEmpty, setIsBoxEmpty] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [scrubberValue, setScrubberValue] = useState(0);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [webglError, setWebglError] = useState(false);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Model Rig References
  const bookRootGroup = useRef<THREE.Group | null>(null);
  const bookFrontHinge = useRef<THREE.Group | null>(null);
  const shadowPlaneRef = useRef<THREE.Mesh | null>(null);

  const boxRootGroup = useRef<THREE.Group | null>(null);
  const boxLidHinge = useRef<THREE.Group | null>(null);
  const boxTuckHinge = useRef<THREE.Group | null>(null);
  const boxLeftDustHinge = useRef<THREE.Group | null>(null);
  const boxRightDustHinge = useRef<THREE.Group | null>(null);
  const boxContentsGroup = useRef<THREE.Group | null>(null);

  const stackedRootGroup = useRef<THREE.Group | null>(null);
  const stackedTopLidHinge = useRef<THREE.Group | null>(null);
  const stackedTopTuckHinge = useRef<THREE.Group | null>(null);

  // Materials & Dynamic Textures
  const bookMaterialsRef = useRef<{
    backMat: THREE.MeshStandardMaterial;
    spineMat: THREE.MeshStandardMaterial;
    frontMat: THREE.MeshStandardMaterial;
  } | null>(null);
  const boxMaterialsRef = useRef<{
    kraftExterior: THREE.MeshStandardMaterial;
    kraftInterior: THREE.MeshStandardMaterial;
    blackExterior: THREE.MeshStandardMaterial;
    blackInterior: THREE.MeshStandardMaterial;
    whiteExterior: THREE.MeshStandardMaterial;
    whiteInterior: THREE.MeshStandardMaterial;
  } | null>(null);
  const boxMeshesRef = useRef<THREE.Mesh[]>([]);
  const decalMeshRef = useRef<THREE.Mesh | null>(null);
  const customTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Dynamic Angles & Damping
  const targetRotation = useRef({ x: 0.12, y: -0.45 });
  const currentRotation = useRef({ x: 0.12, y: -0.45 });
  const targetProgress = useRef(0.0);
  const currentProgress = useRef(0.0);
  const targetCameraZ = useRef(14.8);
  const currentCameraZ = useRef(14.8);

  // Mutable Synchronization State Refs
  const modelTypeRef = useRef<"book" | "box" | "stacked">("book");
  const materialTypeRef = useRef<MaterialType>("kraft");
  const isBoxEmptyRef = useRef(false);
  const isAutoRotatingRef = useRef(true);

  // Pointer & Touch Tracking
  const isPointerDownRef = useRef(false);
  const pointerStartPos = useRef({ x: 0, y: 0 });
  const lastPointerPos = useRef({ x: 0, y: 0 });
  const touchStartDistance = useRef<number | null>(null);

  // Audio Context (Web Audio API)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playFoleySound = useCallback((intensity = 0.5) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Soft paper/cardboard friction burst
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08 * intensity, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio not permitted or supported
    }
  }, [isMuted]);

  // Texture Baker: High-DPI Book Covers
  const bakeCoverTexture = useCallback((type: "front" | "back" | "spine" | "inside_spread" | "endpaper") => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    if (type === "spine") {
      canvas.width = 400;
      canvas.height = 2560;
      ctx.fillStyle = "#f8f5ee";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, "rgba(0,0,0,0.18)");
      grad.addColorStop(0.15, "rgba(0,0,0,0.03)");
      grad.addColorStop(0.85, "rgba(0,0,0,0.03)");
      grad.addColorStop(1, "rgba(0,0,0,0.22)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 52px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("BELAJAR DESAIN GRAFIS  :  AALIYAH LUSIANTI DKK", 0, 18);
      ctx.restore();
      return new THREE.CanvasTexture(canvas);
    }

    if (type === "inside_spread") {
      canvas.width = 1600;
      canvas.height = 2560;
      ctx.fillStyle = "#fcf9f2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Inner gutter shadow
      const gutterGrad = ctx.createLinearGradient(0, 0, 120, 0);
      gutterGrad.addColorStop(0, "rgba(0,0,0,0.22)");
      gutterGrad.addColorStop(1, "rgba(0,0,0,0.0)");
      ctx.fillStyle = gutterGrad;
      ctx.fillRect(0, 0, 120, canvas.height);

      // Title Page Typography
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 76px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("Belajar Desain Grafis", 180, 480);
      ctx.fillText("Untuk Pemula", 180, 580);

      ctx.fillStyle = "#0f766e";
      ctx.font = "italic 44px -apple-system, BlinkMacSystemFont, serif";
      ctx.fillText("Panduan Komprehensif Tata Visual & Tipografi", 180, 680);

      ctx.fillStyle = "#64748b";
      ctx.font = "32px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("Penulis : Aaliyah Lusianti & Tim Studio", 180, 820);
      ctx.fillText("Penerbit : Literasi Nusantara Press", 180, 880);

      // Table of Contents
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(180, 960);
      ctx.lineTo(1420, 960);
      ctx.stroke();

      ctx.fillStyle = "#0f766e";
      ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("DAFTAR ISI RINGKAS", 180, 1060);

      const chapters = [
        { no: "BAB 1", title: "Prinsip Dasar Tata Letak & Hierarki Visual", page: "Hal 01" },
        { no: "BAB 2", title: "Teori Warna Munsell, CMYK Cetak, & Kalibrasi RGB", page: "Hal 48" },
        { no: "BAB 3", title: "Anatomi Huruf, Kerning, & Skala Tipografi", page: "Hal 112" },
        { no: "BAB 4", title: "Pra-Cetak: Bleed, Garis Lipat, & Pisau Pond", page: "Hal 186" },
      ];

      chapters.forEach((ch, idx) => {
        const y = 1180 + idx * 160;
        ctx.fillStyle = "#0f766e";
        ctx.font = "bold 32px monospace";
        ctx.fillText(ch.no, 180, y);

        ctx.fillStyle = "#334155";
        ctx.font = "34px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillText(ch.title, 340, y);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "30px monospace";
        ctx.textAlign = "right";
        ctx.fillText(ch.page, 1420, y);
        ctx.textAlign = "left";
      });

      return new THREE.CanvasTexture(canvas);
    }

    if (type === "endpaper") {
      canvas.width = 1600;
      canvas.height = 2560;
      ctx.fillStyle = "#f3eee3";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(180, 160, 130, 0.18)";
      ctx.lineWidth = 2;
      for (let i = -canvas.height; i < canvas.width * 2; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + canvas.height, canvas.height);
        ctx.stroke();
      }
      return new THREE.CanvasTexture(canvas);
    }

    // Default: Front Cover
    canvas.width = 1600;
    canvas.height = 2560;
    ctx.fillStyle = "#f8f5ee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f766e";
    ctx.font = "bold 110px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Belajar", 160, 480);
    ctx.fillText("Desain", 160, 600);
    ctx.fillText("Grafis", 160, 720);

    ctx.fillStyle = "#d97706";
    ctx.font = "italic 52px -apple-system, BlinkMacSystemFont, serif";
    ctx.fillText("Untuk Pemula", 165, 810);

    // Decorative Icon / Shape
    ctx.fillStyle = "#f1f5f9";
    ctx.beginPath();
    ctx.arc(800, 1420, 320, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0284c7";
    ctx.font = "bold 160px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Ps", 800, 1480);
    ctx.textAlign = "left";

    // Publisher & Metadata
    ctx.fillStyle = "#64748b";
    ctx.font = "36px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Aaliyah Lusianti & Tim Studio", 160, 2260);
    ctx.fillText("LITERASI NUSANTARA", 160, 2330);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Texture Baker: High-Fidelity Packaging Box Textures
  const bakeBoxTexture = useCallback((preset: MaterialType, face: "top" | "side" | "inside") => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = 2048;
    canvas.height = 2048;

    if (preset === "kraft") {
      ctx.fillStyle = "#c29562";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Micro fibrous kraft noise
      for (let i = 0; i < 18000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const w = 1 + Math.random() * 4;
        const h = 1 + Math.random() * 2;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(90, 55, 20, 0.08)" : "rgba(255, 235, 200, 0.12)";
        ctx.fillRect(x, y, w, h);
      }

      // E-Flute faint ribbing
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
      for (let y = 0; y < canvas.height; y += 14) {
        ctx.fillRect(0, y, canvas.width, 4);
      }
    } else if (preset === "black") {
      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Subtle velvet grain
      for (let i = 0; i < 10000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = "rgba(255, 255, 255, 0.025)";
        ctx.fillRect(x, y, 2, 2);
      }
    } else {
      // White Clay-coated
      ctx.fillStyle = "#f4f4f5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (face === "top") {
      // Screenprint / Branding on Top Lid
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      const textColor = preset === "black" ? "#eab308" : "#18181b"; // Gold on black, charcoal on kraft/white
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";

      ctx.font = "bold 92px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("ARTHUR & CO.", 0, -80);

      ctx.font = "600 42px monospace";
      ctx.fillText("EST. 2026 | BOUTIQUE EDITORIAL", 0, 0);

      ctx.font = "36px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillStyle = preset === "black" ? "#d4d4d8" : "#52525b";
      ctx.fillText("CURATED PHYSICAL BOOK & ESSENTIAL GOODS", 0, 70);

      // Dieline info & eco-friendly stamp
      ctx.font = "30px monospace";
      ctx.fillText("FEFCO 0427  :  E-FLUTE CORRUGATED  :  RECYCLABLE", 0, 160);
      ctx.restore();
    } else if (face === "inside") {
      // Inside Lid Greeting (Revealed when opened)
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.fillStyle = preset === "black" ? "#f59e0b" : "#0f766e";
      ctx.textAlign = "center";
      ctx.font = "bold 84px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("TERIMA KASIH", 0, -50);
      ctx.font = "italic 44px -apple-system, BlinkMacSystemFont, serif";
      ctx.fillStyle = preset === "black" ? "#e4e4e7" : "#334155";
      ctx.fillText("Karya cetak fisik bernilai tinggi untuk pembaca setia Anda.", 0, 40);
      ctx.restore();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  // Update Decal Texture when user uploads a custom image
  const updateCustomLogoDecal = useCallback((imgSrc: string | null) => {
    if (!decalMeshRef.current) return;

    if (!imgSrc) {
      decalMeshRef.current.visible = false;
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw custom logo centered on transparent background
      const maxDim = 650;
      const scale = Math.min(maxDim / img.width, maxDim / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.drawImage(img, x, y, w, h);

      if (customTextureRef.current) {
        customTextureRef.current.dispose();
      }
      const tex = new THREE.CanvasTexture(canvas);
      customTextureRef.current = tex;

      const mat = decalMeshRef.current?.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.map = tex;
        mat.needsUpdate = true;
      }
      if (decalMeshRef.current) {
        decalMeshRef.current.visible = true;
      }
    };
    img.src = imgSrc;
  }, []);

  // MAIN MOUNT EFFECT: Instantiates Three.js Scene ONCE
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    try {
      const width = container.clientWidth;
      const height = container.clientHeight || 550;

      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#fbf9f5");
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
      camera.position.set(0, 2.2, 14.8);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Clean PCF Soft Shadows (Zero warning)
      rendererRef.current = renderer;

      // Clear any residual children before attaching
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);

      // 2. Studio Lighting Rig
      const ambientLight = new THREE.AmbientLight(0xfffdf8, 1.4);
      scene.add(ambientLight);

      // Key Directional Light
      const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.1);
      keyLight.position.set(6, 14, 8);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.bias = -0.0004;
      scene.add(keyLight);

      // Soft Warm Fill Light (Diffuses hard triangular shadows)
      const fillLight = new THREE.DirectionalLight(0xfff1e6, 1.3);
      fillLight.position.set(-6, 8, 7);
      scene.add(fillLight);

      // Top-Back Rim Light (Provides crisp edge separation from above, zero glare from floor)
      const rimLight = new THREE.DirectionalLight(0xfff8f0, 0.75);
      rimLight.position.set(0, 12, -9);
      scene.add(rimLight);

      // Studio Ground Plane with Soft Shadow
      const shadowPlaneGeo = new THREE.PlaneGeometry(40, 40);
      const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.13 });
      const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = -2.32;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);
      shadowPlaneRef.current = shadowPlane;

      // 3. BUILD MODEL 1: BUKU HARDCOVER ISO A5
      const bookRoot = new THREE.Group();
      bookRootGroup.current = bookRoot;

      const bookW = 4.4;
      const bookH = 6.2;
      const bookD = 0.52; // 17.4 mm scaled
      const boardThick = 0.06;

      const bookBackMat = new THREE.MeshStandardMaterial({
        map: bakeCoverTexture("front"),
        roughness: 0.82,
        metalness: 0.0,
      });
      const bookSpineMat = new THREE.MeshStandardMaterial({
        map: bakeCoverTexture("spine"),
        roughness: 0.82,
        metalness: 0.0,
      });
      const bookSpreadMat = new THREE.MeshStandardMaterial({
        map: bakeCoverTexture("inside_spread"),
        roughness: 0.9,
      });
      const bookEndpaperMat = new THREE.MeshStandardMaterial({
        map: bakeCoverTexture("endpaper"),
        roughness: 0.88,
      });

      bookMaterialsRef.current = {
        backMat: bookBackMat,
        spineMat: bookSpineMat,
        frontMat: bookBackMat,
      };

      // Book Body Pages Block
      const pagesGeo = new THREE.BoxGeometry(bookW - 0.15, bookH - 0.25, bookD - 0.08);
      const pagesBlock = new THREE.Mesh(pagesGeo, [
        bookSpineMat, bookSpineMat,
        bookSpreadMat, // Top edge (revealed when cover opens)
        bookSpreadMat,
        bookSpreadMat, bookSpreadMat,
      ]);
      pagesBlock.position.set(0.08, 0, -boardThick / 2);
      pagesBlock.castShadow = true;
      pagesBlock.receiveShadow = true;
      bookRoot.add(pagesBlock);

      // Back Board & Spine
      const backBoardGeo = new THREE.BoxGeometry(bookW, bookH, boardThick);
      const backBoardMesh = new THREE.Mesh(backBoardGeo, bookBackMat);
      backBoardMesh.position.set(0, 0, -bookD / 2);
      backBoardMesh.castShadow = true;
      bookRoot.add(backBoardMesh);

      const spineGeo = new THREE.BoxGeometry(boardThick, bookH, bookD);
      const spineMesh = new THREE.Mesh(spineGeo, bookSpineMat);
      spineMesh.position.set(-bookW / 2, 0, -boardThick / 2);
      spineMesh.castShadow = true;
      bookRoot.add(spineMesh);

      // Left-Hinge Front Cover (Rotates -160°)
      const frontHinge = new THREE.Group();
      frontHinge.position.set(-bookW / 2, 0, bookD / 2);
      bookFrontHinge.current = frontHinge;

      const frontBoardGeo = new THREE.BoxGeometry(bookW, bookH, boardThick);
      const frontBoardMesh = new THREE.Mesh(frontBoardGeo, [
        bookSpineMat, bookSpineMat, bookSpineMat, bookSpineMat,
        bookBackMat, // Front cover
        bookEndpaperMat, // Inside endpaper
      ]);
      frontBoardMesh.position.set(bookW / 2, 0, 0);
      frontBoardMesh.castShadow = true;
      frontHinge.add(frontBoardMesh);
      bookRoot.add(frontHinge);

      bookRoot.position.set(0, 0.82, 0); // Elevated comfortably above bottom scrubber
      bookRoot.visible = true; // Default Active
      scene.add(bookRoot);

      // 4. BUILD MODEL 2: HOLLOW FEFCO 0427 MAILER BOX
      const boxRoot = new THREE.Group();
      boxRootGroup.current = boxRoot;

      const boxW = 6.6;
      const boxH = 2.0;
      const boxD = 5.2;
      const wallT = 0.08;

      // Material cache
      const kraftExt = new THREE.MeshStandardMaterial({
        map: bakeBoxTexture("kraft", "top"),
        roughness: 0.88,
        metalness: 0.0,
      });
      const kraftInt = new THREE.MeshStandardMaterial({
        map: bakeBoxTexture("kraft", "inside"),
        roughness: 0.88,
        metalness: 0.0,
      });
      const blackExt = new THREE.MeshStandardMaterial({
        map: bakeBoxTexture("black", "top"),
        roughness: 0.78,
        metalness: 0.02,
      });
      const blackInt = new THREE.MeshStandardMaterial({
        map: bakeBoxTexture("black", "inside"),
        roughness: 0.65,
        metalness: 0.0,
      });
      const whiteExt = new THREE.MeshStandardMaterial({
        map: bakeBoxTexture("white", "top"),
        roughness: 0.75,
        metalness: 0.0,
      });
      const whiteInt = new THREE.MeshStandardMaterial({
        map: bakeBoxTexture("white", "inside"),
        roughness: 0.65,
        metalness: 0.0,
      });

      boxMaterialsRef.current = {
        kraftExterior: kraftExt,
        kraftInterior: kraftInt,
        blackExterior: blackExt,
        blackInterior: blackInt,
        whiteExterior: whiteExt,
        whiteInterior: whiteInt,
      };

      const curExtMat = kraftExt;
      const curIntMat = kraftInt;

      // A. Hollow Base Floor
      const baseFloorGeo = new THREE.BoxGeometry(boxW, wallT, boxD);
      const baseFloor = new THREE.Mesh(baseFloorGeo, curExtMat);
      baseFloor.position.set(0, -boxH / 2, 0);
      baseFloor.castShadow = true;
      baseFloor.receiveShadow = true;
      boxRoot.add(baseFloor);
      boxMeshesRef.current.push(baseFloor);

      // B. 4 Upright Hollow Walls (Rear, Front, Left, Right)
      const rearWallGeo = new THREE.BoxGeometry(boxW, boxH, wallT);
      const rearWall = new THREE.Mesh(rearWallGeo, curExtMat);
      rearWall.position.set(0, 0, -boxD / 2);
      rearWall.castShadow = true;
      boxRoot.add(rearWall);
      boxMeshesRef.current.push(rearWall);

      const frontWallGeo = new THREE.BoxGeometry(boxW, boxH, wallT);
      const frontWall = new THREE.Mesh(frontWallGeo, curExtMat);
      frontWall.position.set(0, 0, boxD / 2);
      frontWall.castShadow = true;
      boxRoot.add(frontWall);
      boxMeshesRef.current.push(frontWall);

      const sideWallGeo = new THREE.BoxGeometry(wallT, boxH, boxD - wallT * 2);
      const leftWall = new THREE.Mesh(sideWallGeo, curExtMat);
      leftWall.position.set(-boxW / 2 + wallT / 2, 0, 0);
      leftWall.castShadow = true;
      boxRoot.add(leftWall);
      boxMeshesRef.current.push(leftWall);

      const rightWall = new THREE.Mesh(sideWallGeo, curExtMat);
      rightWall.position.set(boxW / 2 - wallT / 2, 0, 0);
      rightWall.castShadow = true;
      boxRoot.add(rightWall);
      boxMeshesRef.current.push(rightWall);

      // C. Forward Kinematics Lid Assembly
      const rearHinge = new THREE.Group();
      rearHinge.position.set(0, boxH / 2, -boxD / 2);
      boxLidHinge.current = rearHinge;

      const mainLidGeo = new THREE.BoxGeometry(boxW + 0.05, wallT, boxD);
      const mainLid = new THREE.Mesh(mainLidGeo, [
        curExtMat, curExtMat,
        curExtMat, // Top exterior
        curIntMat, // Inside lid greeting
        curExtMat, curExtMat,
      ]);
      mainLid.position.set(0, wallT / 2, boxD / 2);
      mainLid.castShadow = true;
      rearHinge.add(mainLid);
      boxMeshesRef.current.push(mainLid);

      // Front Tuck Flap (Nested under Main Lid)
      const tuckHinge = new THREE.Group();
      tuckHinge.position.set(0, 0, boxD / 2);
      boxTuckHinge.current = tuckHinge;

      const tuckFlapGeo = new THREE.BoxGeometry(boxW * 0.95, boxH * 0.75, wallT);
      const tuckFlap = new THREE.Mesh(tuckFlapGeo, curExtMat);
      tuckFlap.position.set(0, -boxH * 0.375, 0);
      tuckFlap.castShadow = true;
      tuckHinge.add(tuckFlap);
      mainLid.add(tuckHinge);
      boxMeshesRef.current.push(tuckFlap);

      // Side Dust Flaps (Integrated onto Main Lid in FEFCO 0427 RETF standard)
      const leftDustHinge = new THREE.Group();
      leftDustHinge.position.set(-boxW / 2 + wallT, 0, 0);
      boxLeftDustHinge.current = leftDustHinge;
      const dustGeo = new THREE.BoxGeometry(wallT, boxH * 0.78, boxD * 0.88);
      const leftDust = new THREE.Mesh(dustGeo, curExtMat);
      leftDust.position.set(0, -boxH * 0.39, 0);
      leftDust.castShadow = true;
      leftDustHinge.add(leftDust);
      mainLid.add(leftDustHinge);
      boxMeshesRef.current.push(leftDust);

      const rightDustHinge = new THREE.Group();
      rightDustHinge.position.set(boxW / 2 - wallT, 0, 0);
      boxRightDustHinge.current = rightDustHinge;
      const rightDust = new THREE.Mesh(dustGeo, curExtMat);
      rightDust.position.set(0, -boxH * 0.39, 0);
      rightDust.castShadow = true;
      rightDustHinge.add(rightDust);
      mainLid.add(rightDustHinge);
      boxMeshesRef.current.push(rightDust);

      // Custom Logo Decal Mesh (Positioned on top of main lid)
      const decalGeo = new THREE.PlaneGeometry(boxW * 0.6, boxD * 0.6);
      const decalMat = new THREE.MeshStandardMaterial({
        transparent: true,
        roughness: 0.3,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      });
      const decalMesh = new THREE.Mesh(decalGeo, decalMat);
      decalMesh.rotation.x = -Math.PI / 2;
      decalMesh.position.set(0, wallT + 0.01, boxD / 2);
      decalMesh.visible = false;
      decalMeshRef.current = decalMesh;
      mainLid.add(decalMesh);

      boxRoot.add(rearHinge);

      // D. Internal Contents: Nested Hardcover Book & Crinkled Tissue Paper
      const contentsGroup = new THREE.Group();
      boxContentsGroup.current = contentsGroup;

      // Tissue Paper Bed
      const tissueGeo = new THREE.BoxGeometry(boxW - 0.45, 0.22, boxD - 0.45);
      const tissueMat = new THREE.MeshStandardMaterial({
        color: "#f8fafc",
        roughness: 0.95,
      });
      const tissueMesh = new THREE.Mesh(tissueGeo, tissueMat);
      tissueMesh.position.set(0, -boxH / 2 + 0.12, 0);
      contentsGroup.add(tissueMesh);

      // Inside Hardcover Book (Resting snug in the box without geometric clipping)
      const innerBookGeo = new THREE.BoxGeometry(3.5, 0.38, 4.4);
      const innerBookMats = [
        bookSpineMat, // 0: +X Right edge
        bookSpreadMat, // 1: -X Left edge
        bookBackMat, // 2: +Y Top cover (Belajar Desain Grafis & Ps logo)
        bookEndpaperMat, // 3: -Y Bottom cover
        bookSpreadMat, // 4: +Z Front page block edge (Clean ivory paper)
        bookSpreadMat, // 5: -Z Rear page block edge
      ];
      const innerBook = new THREE.Mesh(innerBookGeo, innerBookMats);
      innerBook.position.set(0, -boxH / 2 + 0.12 + 0.19, 0);
      innerBook.castShadow = true;
      contentsGroup.add(innerBook);

      boxRoot.add(contentsGroup);
      boxRoot.position.set(0, 0.55, 0); // Elevated comfortably above bottom scrubber
      boxRoot.visible = false; // Initially hidden
      scene.add(boxRoot);

      // 5. BUILD MODEL 3: 3-BOX STACKING RIG (Supply Family Box 07 style)
      const stackedRoot = new THREE.Group();
      stackedRootGroup.current = stackedRoot;

      const makeSingleBoxMesh = (hasTape = false, isTop = false) => {
        const grp = new THREE.Group();
        const base = new THREE.Mesh(new THREE.BoxGeometry(boxW, boxH, boxD), curExtMat);
        base.castShadow = true;
        base.receiveShadow = true;
        grp.add(base);

        if (hasTape) {
          const tapeGeo = new THREE.BoxGeometry(1.2, boxH + 0.04, boxD + 0.04);
          const tapeMat = new THREE.MeshStandardMaterial({
            color: "#9a6c38", // Kraft adhesive packing tape
            roughness: 0.4,
          });
          const tape = new THREE.Mesh(tapeGeo, tapeMat);
          grp.add(tape);
        }

        if (isTop) {
          const topLidHinge = new THREE.Group();
          topLidHinge.position.set(0, boxH / 2, -boxD / 2);
          stackedTopLidHinge.current = topLidHinge;

          const topLid = new THREE.Mesh(new THREE.BoxGeometry(boxW + 0.05, wallT, boxD), curExtMat);
          topLid.position.set(0, wallT / 2, boxD / 2);
          topLidHinge.add(topLid);

          const topTuckHinge = new THREE.Group();
          topTuckHinge.position.set(0, 0, boxD / 2);
          stackedTopTuckHinge.current = topTuckHinge;

          const topTuck = new THREE.Mesh(new THREE.BoxGeometry(boxW * 0.95, boxH * 0.7, wallT), curExtMat);
          topTuck.position.set(0, -boxH * 0.35, 0);
          topTuckHinge.add(topTuck);
          topLid.add(topTuckHinge);

          grp.add(topLidHinge);
        }

        return grp;
      };

      // Bottom Box (Sealed with tape)
      const btmBox = makeSingleBoxMesh(true, false);
      btmBox.position.set(0, -2.2, 0);
      btmBox.rotation.y = -0.06;
      stackedRoot.add(btmBox);

      // Middle Box (Rotated naturally)
      const midBox = makeSingleBoxMesh(false, false);
      midBox.position.set(0, -0.05, 0);
      midBox.rotation.y = 0.08;
      stackedRoot.add(midBox);

      // Top Box (Articulated with Scrubber)
      const topBox = makeSingleBoxMesh(false, true);
      topBox.position.set(0, 2.1, 0);
      topBox.rotation.y = -0.03;
      stackedRoot.add(topBox);

      stackedRoot.position.set(0, 0.45, 0); // Elevated comfortably above bottom scrubber
      stackedRoot.visible = false;
      scene.add(stackedRoot);

      // 6. ANIMATION & INTERACTION LOOP
      const animate = () => {
        const curModel = modelTypeRef.current;
        const activeGroup =
          curModel === "book"
            ? bookRootGroup.current
            : curModel === "box"
            ? boxRootGroup.current
            : stackedRootGroup.current;

        if (activeGroup) {
          if (isAutoRotatingRef.current && !isPointerDownRef.current) {
            targetRotation.current.y += 0.004;
          }

          // Smooth Euler Orbit Damping
          currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.09;
          currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.09;
          activeGroup.rotation.y = currentRotation.current.y;
          activeGroup.rotation.x = currentRotation.current.x;
        }

        // Smooth Progress Damping for Unboxing
        currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;
        const p = currentProgress.current;

        // Kinematics for Book
        if (bookFrontHinge.current) {
          bookFrontHinge.current.rotation.y = -p * 2.75; // 0 to -160 degrees
        }

        // Kinematics for Mailer Box
        if (boxTuckHinge.current) {
          const tuckP = Math.min(1.0, p / 0.18);
          boxTuckHinge.current.rotation.x = tuckP * (Math.PI * 0.65);
        }
        if (boxLidHinge.current) {
          const lidP = Math.max(0.0, Math.min(1.0, (p - 0.12) / 0.65));
          boxLidHinge.current.rotation.x = -lidP * (Math.PI * 0.65);
        }
        if (boxLeftDustHinge.current && boxRightDustHinge.current) {
          const flareP = Math.max(0.0, Math.min(1.0, (p - 0.2) / 0.6));
          boxLeftDustHinge.current.rotation.z = -flareP * 0.05;
          boxRightDustHinge.current.rotation.z = flareP * 0.05;
        }
        if (boxContentsGroup.current) {
          boxContentsGroup.current.visible = !isBoxEmptyRef.current;
          const elevateP = Math.max(0.0, Math.min(1.0, (p - 0.75) / 0.25));
          boxContentsGroup.current.position.y = elevateP * 0.28; // Gentle unboxing elevation
        }

        // Kinematics for Top Stacked Box
        if (stackedTopTuckHinge.current) {
          const tuckP = Math.min(1.0, p / 0.18);
          stackedTopTuckHinge.current.rotation.x = tuckP * (Math.PI * 0.65);
        }
        if (stackedTopLidHinge.current) {
          const lidP = Math.max(0.0, Math.min(1.0, (p - 0.12) / 0.65));
          stackedTopLidHinge.current.rotation.x = -lidP * (Math.PI * 0.65);
        }

        // Camera Zoom & Elevated Framing Damping (Keeps objects centered above UI controls)
        if (cameraRef.current) {
          currentCameraZ.current += (targetCameraZ.current - currentCameraZ.current) * 0.1;
          cameraRef.current.position.z = currentCameraZ.current;
          cameraRef.current.lookAt(0, 0.62, 0);
        }

        renderer.render(scene, camera);
        animFrameId.current = requestAnimationFrame(animate);
      };

      animate();

      // Handle Resize
      const handleResize = () => {
        if (!container || !rendererRef.current || !cameraRef.current) return;
        const w = container.clientWidth;
        const h = container.clientHeight || 550;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
        renderer.dispose();
      };
    } catch {
      setWebglError(true);
    }
  }, [bakeCoverTexture, bakeBoxTexture]); // Mounted ONCE

  // Reactive Synchronizers without Remounting Scene
  useEffect(() => {
    modelTypeRef.current = modelType;
    if (bookRootGroup.current) bookRootGroup.current.visible = modelType === "book";
    if (boxRootGroup.current) boxRootGroup.current.visible = modelType === "box";
    if (stackedRootGroup.current) stackedRootGroup.current.visible = modelType === "stacked";
  }, [modelType]);

  useEffect(() => {
    isBoxEmptyRef.current = isBoxEmpty;
  }, [isBoxEmpty]);

  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // Update Box Materials when material preset changes
  useEffect(() => {
    materialTypeRef.current = materialType;
    if (!boxMaterialsRef.current) return;

    const extMat =
      materialType === "kraft"
        ? boxMaterialsRef.current.kraftExterior
        : materialType === "black"
        ? boxMaterialsRef.current.blackExterior
        : boxMaterialsRef.current.whiteExterior;

    const intMat =
      materialType === "kraft"
        ? boxMaterialsRef.current.kraftInterior
        : materialType === "black"
        ? boxMaterialsRef.current.blackInterior
        : boxMaterialsRef.current.whiteInterior;

    boxMeshesRef.current.forEach((mesh) => {
      if (Array.isArray(mesh.material)) {
        mesh.material[2] = extMat;
        mesh.material[3] = intMat;
      } else {
        mesh.material = extMat;
      }
    });
  }, [materialType]);

  // Update Book Materials when bookFinish preset changes
  useEffect(() => {
    if (!bookMaterialsRef.current) return;
    const { backMat, spineMat, frontMat } = bookMaterialsRef.current;
    if (bookFinish === "doff") {
      backMat.roughness = 0.82;
      backMat.metalness = 0.0;
      spineMat.roughness = 0.82;
      spineMat.metalness = 0.0;
      frontMat.roughness = 0.82;
      frontMat.metalness = 0.0;
    } else if (bookFinish === "glossy") {
      backMat.roughness = 0.22;
      backMat.metalness = 0.05;
      spineMat.roughness = 0.22;
      spineMat.metalness = 0.05;
      frontMat.roughness = 0.22;
      frontMat.metalness = 0.05;
    } else if (bookFinish === "linen") {
      backMat.roughness = 0.95;
      backMat.metalness = 0.0;
      spineMat.roughness = 0.95;
      spineMat.metalness = 0.0;
      frontMat.roughness = 0.95;
      frontMat.metalness = 0.0;
    }
    backMat.needsUpdate = true;
    spineMat.needsUpdate = true;
    frontMat.needsUpdate = true;
  }, [bookFinish]);

  // Model Switch Handler
  const switchModel = (type: "book" | "box" | "stacked") => {
    setModelType(type);
    setIsOpen(false);
    setScrubberValue(0);
    targetProgress.current = 0.0;
    targetRotation.current =
      type === "book"
        ? { x: 0.12, y: -0.45 }
        : type === "box"
        ? { x: 0.28, y: -0.55 }
        : { x: 0.18, y: -0.38 };

    if (shadowPlaneRef.current) {
      if (type === "book") {
        shadowPlaneRef.current.position.y = -2.32;
      } else if (type === "box") {
        shadowPlaneRef.current.position.y = -0.48;
      } else if (type === "stacked") {
        shadowPlaneRef.current.position.y = -1.58;
      }
    }

    playFoleySound(0.4);
  };

  // Toggle Open/Close Kinematics
  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    setIsAutoRotating(false);
    const targetP = nextState ? 1.0 : 0.0;
    targetProgress.current = targetP;
    setScrubberValue(targetP * 100);

    if (nextState) {
      targetRotation.current =
        modelType === "book"
          ? { x: 0.18, y: -0.15 }
          : { x: 0.35, y: -0.2 };
    } else {
      targetRotation.current =
        modelType === "book"
          ? { x: 0.12, y: -0.45 }
          : { x: 0.28, y: -0.55 };
    }
    playFoleySound(0.7);
  };

  // Scrubber Slider Drag Handler
  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setScrubberValue(val);
    const p = val / 100;
    targetProgress.current = p;
    setIsOpen(p > 0.5);
    setIsAutoRotating(false);
    playFoleySound(0.2);
  };

  // Preset Angles
  const setPresetAngle = (preset: "front" | "open" | "spine") => {
    setIsAutoRotating(false);
    if (preset === "front") {
      targetProgress.current = 0.0;
      setIsOpen(false);
      setScrubberValue(0);
      targetRotation.current =
        modelType === "book" ? { x: 0.0, y: 0.0 } : { x: 0.32, y: 0.0 };
    } else if (preset === "open") {
      targetProgress.current = 1.0;
      setIsOpen(true);
      setScrubberValue(100);
      targetRotation.current =
        modelType === "book" ? { x: 0.22, y: -0.18 } : { x: 0.42, y: -0.22 };
    } else if (preset === "spine") {
      targetProgress.current = 0.0;
      setIsOpen(false);
      setScrubberValue(0);
      targetRotation.current =
        modelType === "book" ? { x: 0.06, y: 2.75 } : { x: 0.18, y: 1.57 };
    }
    playFoleySound(0.5);
  };

  // Pointer Drag Handlers (Orbit 360)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    isPointerDownRef.current = true;
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - lastPointerPos.current.x;
    const deltaY = e.clientY - lastPointerPos.current.y;

    targetRotation.current.y += deltaX * 0.008;
    targetRotation.current.x += deltaY * 0.006;
    targetRotation.current.x = Math.max(-0.65, Math.min(0.65, targetRotation.current.x));
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    isPointerDownRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    const dist = Math.hypot(
      e.clientX - pointerStartPos.current.x,
      e.clientY - pointerStartPos.current.y
    );
    if (dist < 6) {
      toggleOpen();
    }
  };

  // Pinch-to-Zoom (2 Fingers on Touch Devices)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistance.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistance.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const diff = currentDist - touchStartDistance.current;

      targetCameraZ.current = Math.max(9.0, Math.min(22.0, targetCameraZ.current - diff * 0.025));
      touchStartDistance.current = currentDist;
    }
  };

  const handleTouchEnd = () => {
    touchStartDistance.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetCameraZ.current = Math.max(9.0, Math.min(22.0, targetCameraZ.current + e.deltaY * 0.015));
  };

  const zoomIn = () => {
    targetCameraZ.current = Math.max(9.0, targetCameraZ.current - 2.0);
  };
  const zoomOut = () => {
    targetCameraZ.current = Math.min(22.0, targetCameraZ.current + 2.0);
  };
  const resetZoom = () => {
    targetCameraZ.current = 14.8;
    targetRotation.current = { x: 0.12, y: -0.45 };
  };

  // Handle User Uploading Custom Logo Decal
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCustomLogoUrl(result);
      updateCustomLogoDecal(result);
    };
    reader.readAsDataURL(file);
  };

  const removeCustomLogo = () => {
    setCustomLogoUrl(null);
    updateCustomLogoDecal(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (webglError) {
    return (
      <div className="w-full h-[520px] bg-amber-50 rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-amber-200">
        <Package className="w-12 h-12 text-amber-700 mb-3" />
        <h3 className="font-heading font-bold text-lg text-zinc-900">Spesimen 3D Interaktif</h3>
        <p className="text-sm text-zinc-600 max-w-md mt-1 mb-4">
          Peramban Anda sedang membatasi akselerasi grafis 3D. Pratinjau tetap dapat dinikmati melalui galeri foto material resolusi tinggi di bawah.
        </p>
        <img src={fallbackImage} alt="Pratinjau Spesimen" className="max-h-64 object-contain rounded-xl shadow-md" />
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#FAF8F5] rounded-3xl border border-zinc-200/90 shadow-sm overflow-hidden select-none">
      {/* Hidden File Input for Custom Logo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Top Main Navigation Bar */}
      <div className="p-3 sm:p-4 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xs flex flex-wrap items-center justify-between gap-3">
        {/* Specimen Switcher (3 Pills) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 border border-zinc-200/70 text-xs">
          <button
            type="button"
            onClick={() => switchModel("book")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              modelType === "book"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Book className="w-3.5 h-3.5" />
            <span>1: Buku Hardcover</span>
          </button>

          <button
            type="button"
            onClick={() => switchModel("box")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              modelType === "box"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>2: Dus Kemasan Box</span>
          </button>

          <button
            type="button"
            onClick={() => switchModel("stacked")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              modelType === "stacked"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3: Tumpukan Dus</span>
            <span className="sm:hidden">3: Tumpuk</span>
          </button>
        </div>

        {/* Right Tools: Angle Presets & Studio Drawer Toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200/70 text-xs">
            <button
              type="button"
              onClick={() => setPresetAngle("front")}
              className="px-2.5 py-1 text-zinc-700 hover:bg-white rounded font-medium transition-colors"
            >
              {modelType === "book" ? "Depan" : "Tampak Depan"}
            </button>
            <button
              type="button"
              onClick={() => setPresetAngle("spine")}
              className="px-2.5 py-1 text-zinc-700 hover:bg-white rounded font-medium transition-colors"
            >
              {modelType === "book" ? "Punggung & ISBN" : "Sisi Samping"}
            </button>
            <button
              type="button"
              onClick={() => setPresetAngle("open")}
              className="px-2.5 py-1 text-zinc-700 hover:bg-white rounded font-medium transition-colors"
            >
              {modelType === "book" ? "Buka Halaman" : "Buka Unboxing"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-xl border text-xs transition-colors ${
              !isMuted
                ? "bg-teal-50 text-teal-800 border-teal-200 shadow-2xs"
                : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50"
            }`}
            title={isMuted ? "Bunyikan Efek Taktil" : "Bisukan Efek Suara"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isDrawerOpen
                ? "bg-teal-700 text-white border-teal-700"
                : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50 shadow-2xs"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Kustomisasi</span>
          </button>
        </div>
      </div>

      {/* Dynamic Specimen Context Banner */}
      <div className="px-4 py-2.5 bg-amber-50/60 border-b border-zinc-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-900">
            {modelType === "book" && "Spesimen 1: Buku Fisik Hardcover (ISO A5)"}
            {modelType === "box" && "Spesimen 2: Dus Kemasan Mailer Box (FEFCO 0427)"}
            {modelType === "stacked" && "Spesimen 3: Tumpukan Dus Retail (Display Toko)"}
          </span>
          <span className="text-zinc-400 hidden md:inline">•</span>
          <span className="text-zinc-600 hidden md:inline">
            {modelType === "book" && "Punggung jilid 17.4 mm (240 halaman bookpaper 72 gsm), board greyboard 3.0 mm, jilid jahit benang."}
            {modelType === "box" && "Sistem penguncian roll-end tuck-front (RETF) tanpa lakban, karton E-Flute 1.5 mm, bantalan tisu."}
            {modelType === "stacked" && "Simulasi susunan batch ekspedisi atau etalase toko buku. Boks teratas dapat dibuka interaktif."}
          </span>
        </div>
        <div className="shrink-0">
          <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] bg-white border border-zinc-200 text-zinc-700 shadow-2xs">
            {modelType === "book" && "ISO A5 • 240 Hlm • Jahit Benang"}
            {modelType === "box" && "FEFCO 0427 • E-Flute 1.5mm • 22x16x4.5cm"}
            {modelType === "stacked" && "Display Toko • 3 Tingkat • Ritel Ready"}
          </span>
        </div>
      </div>

      {/* Main Interactive 3D Canvas */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className={`w-full h-[520px] sm:h-[620px] cursor-grab active:cursor-grabbing touch-none ${
          isDragging ? "cursor-grabbing" : ""
        }`}
      />

      {/* Floating Side Drawer (Controls for Material & Custom Decal) */}
      {isDrawerOpen && (
        <div className="absolute top-28 right-3 sm:right-4 z-20 w-72 sm:w-80 bg-white/95 rounded-2xl border border-zinc-200/90 shadow-xl p-4 sm:p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
            <h4 className="text-xs font-heading font-bold text-zinc-900 uppercase tracking-wider">
              {modelType === "book" ? "Kustomisasi Fisik Sampul Buku" : "Kustomisasi Dus Kemasan"}
            </h4>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {modelType === "book" ? (
            /* Controls for Physical Hardcover Book */
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 block">
                  Pilihan Finishing Sampul Buku
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookFinish("doff")}
                    className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      bookFinish === "doff"
                        ? "border-teal-700 bg-teal-50/60 shadow-2xs"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-zinc-200 border border-zinc-300 mb-1" />
                    <span className="text-[11px] font-bold text-zinc-900">Doff Beludru</span>
                    <span className="text-[10px] text-zinc-500">Soft Touch</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookFinish("glossy")}
                    className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      bookFinish === "glossy"
                        ? "border-teal-700 bg-teal-50/60 shadow-2xs"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-100 border border-amber-300 mb-1" />
                    <span className="text-[11px] font-bold text-zinc-900">Glossy UV</span>
                    <span className="text-[10px] text-zinc-500">Kilau Tinggi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookFinish("linen")}
                    className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      bookFinish === "linen"
                        ? "border-teal-700 bg-teal-50/60 shadow-2xs"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-200/60 border border-amber-400 mb-1" />
                    <span className="text-[11px] font-bold text-zinc-900">Linen Kain</span>
                    <span className="text-[10px] text-zinc-500">Klasik Mewah</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5 text-xs">
                <span className="font-semibold text-zinc-800 block">Parameter Fisik Buku:</span>
                <div className="flex justify-between text-zinc-600 text-[11px]">
                  <span>Ukuran Kertas:</span>
                  <span className="font-mono font-medium text-zinc-900">ISO A5 (148 x 210 mm)</span>
                </div>
                <div className="flex justify-between text-zinc-600 text-[11px]">
                  <span>Tebal Punggung Jilid:</span>
                  <span className="font-mono font-medium text-zinc-900">17.4 mm (240 Halaman)</span>
                </div>
                <div className="flex justify-between text-zinc-600 text-[11px]">
                  <span>Inti Hardcover:</span>
                  <span className="font-mono font-medium text-zinc-900">Greyboard Kaku 3.0 mm</span>
                </div>
                <div className="flex justify-between text-zinc-600 text-[11px]">
                  <span>Metode Jilid:</span>
                  <span className="font-mono font-medium text-zinc-900">Jahit Benang Rebah 180°</span>
                </div>
              </div>
            </div>
          ) : (
            /* Controls for Packaging Box */
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 block">
                  Pilihan Bahan Karton Kemasan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMaterialType("kraft")}
                    className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      materialType === "kraft"
                        ? "border-amber-600 bg-amber-50/60 shadow-2xs"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#c29562] border border-amber-700/40 mb-1" />
                    <span className="text-[11px] font-bold text-zinc-900">Kraft Cokelat</span>
                    <span className="text-[10px] text-zinc-500">Serat Alami</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMaterialType("black")}
                    className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      materialType === "black"
                        ? "border-zinc-800 bg-zinc-900 text-white shadow-2xs"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-zinc-900 border border-zinc-700 mb-1" />
                    <span className={`text-[11px] font-bold ${materialType === "black" ? "text-white" : "text-zinc-900"}`}>
                      Hitam Mewah
                    </span>
                    <span className={`text-[10px] ${materialType === "black" ? "text-zinc-400" : "text-zinc-500"}`}>
                      Foil Emas
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMaterialType("white")}
                    className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      materialType === "white"
                        ? "border-teal-700 bg-teal-50/60 shadow-2xs"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#f4f4f5] border border-zinc-300 mb-1" />
                    <span className="text-[11px] font-bold text-zinc-900">Putih Retail</span>
                    <span className="text-[10px] text-zinc-500">Doff Satin</span>
                  </button>
                </div>
              </div>

              {/* Toggle Isi Boks (Buku vs Kosong) */}
              {modelType === "box" && (
                <div className="space-y-1.5 pt-2 border-t border-zinc-100">
                  <label className="text-xs font-semibold text-zinc-700 block">
                    Isi Bagian Dalam Kemasan
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsBoxEmpty(false)}
                      className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors ${
                        !isBoxEmpty
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      Berisi Buku & Tisu
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBoxEmpty(true)}
                      className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors ${
                        isBoxEmpty
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      Rongga Bersih
                    </button>
                  </div>
                </div>
              )}

              {/* Live Custom Logo Decal Uploader */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <label className="text-xs font-semibold text-zinc-700 block">
                  Simulasi Logo / Desain Anda di Atas Boks
                </label>
                {customLogoUrl ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-teal-50 border border-teal-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-700" />
                      <span className="text-teal-900 font-medium">Logo Terpasang</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCustomLogo}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 px-3 rounded-xl border border-dashed border-zinc-300 text-xs text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50 flex items-center justify-center gap-2 font-medium transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Unggah Logo (PNG/JPG)</span>
                  </button>
                )}
                <p className="text-[10px] text-zinc-500 leading-normal">
                  Gambar akan ditempelkan seketika di permukaan boks 3D secara lokal di peramban.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Zoom Controls (Top Left) */}
      <div className="absolute top-28 left-3 sm:left-4 z-10 flex flex-col gap-1 bg-white/95 p-1 rounded-xl border border-zinc-200/90 shadow-xs backdrop-blur-xs">
        <button
          type="button"
          onClick={zoomIn}
          className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
          title="Perbesar (Zoom In)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
          title="Perkecil (Zoom Out)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={resetZoom}
          className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors border-t border-zinc-100"
          title="Reset Kamera"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Floating Scrubber & Interactive Controls Bar */}
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex flex-col gap-2 pointer-events-none">
        {/* Scrubber Slider Card */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
            <button
              type="button"
              onClick={toggleOpen}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-2xs ${
                isOpen
                  ? "bg-teal-700 text-white"
                  : "bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200"
              }`}
            >
              {isOpen ? <Book className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
              <span>
                {modelType === "book"
                  ? isOpen ? "Tutup Buku" : "Buka Buku"
                  : modelType === "box"
                  ? isOpen ? "Tutup Kemasan" : "Buka Kemasan"
                  : isOpen ? "Tutup Boks Atas" : "Buka Boks Atas"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                isAutoRotating
                  ? "bg-zinc-100 text-zinc-800 border-zinc-200"
                  : "bg-white text-zinc-600 border-zinc-200"
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Interactive Unboxing Scrubber Slider */}
          <div className="w-full sm:flex-1 flex items-center gap-3">
            <span className="text-[11px] font-mono text-zinc-500 shrink-0">
              {modelType === "book" ? "Tutup" : modelType === "box" ? "Terkunci" : "Tertata"}
            </span>

            <input
              type="range"
              min="0"
              max="100"
              value={scrubberValue}
              onChange={handleScrubberChange}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              title="Geser untuk mengatur tingkat bukaan boks secara presisi"
            />

            <span className="text-[11px] font-mono text-zinc-500 shrink-0">
              {modelType === "book" ? "Terbuka" : modelType === "box" ? "Unboxed" : "Terbuka"}
            </span>

            <span className="text-xs font-mono font-bold text-zinc-800 min-w-[36px] text-right shrink-0">
              {Math.round(scrubberValue)}%
            </span>
          </div>
        </div>

        {/* Tactile Gestures Guidance Note */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 px-2 pointer-events-auto">
          <span>
            {modelType === "book"
              ? "Putar 360° bebas. Buka buku atau geser slider untuk memeriksa bagian dalam halaman naskah."
              : modelType === "box"
              ? "Engsel 4-tahap FEFCO 0427. Geser slider untuk simulasi unboxing buku."
              : "Display tumpukan 3 boks ritel. Buka boks teratas untuk inspeksi produk."}
          </span>
          <span className="font-mono text-teal-800 font-semibold hidden sm:inline">
            Presisi Geometri Cetak Fisik
          </span>
        </div>
      </div>
    </div>
  );
}
