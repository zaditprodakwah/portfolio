"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  RotateCw,
  RefreshCw,
  BookOpen,
  Book,
  Package,
  ZoomIn,
  ZoomOut,
  Compass,
  FileText,
  Sparkles,
} from "lucide-react";

interface InteractiveModelViewerProps {
  fallbackImage?: string;
}

export default function InteractiveBookViewer({
  fallbackImage = "/editorial-studio/hero-mockup-3d.png",
}: InteractiveModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // States
  const [modelType, setModelType] = useState<"book" | "box">("book");
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [activeAngle, setActiveAngle] = useState<"front" | "open" | "spine">("front");
  const [webglError, setWebglError] = useState(false);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Model Rig References
  const bookRootGroup = useRef<THREE.Group | null>(null);
  const bookFrontHinge = useRef<THREE.Group | null>(null);
  const boxRootGroup = useRef<THREE.Group | null>(null);
  const boxLidHinge = useRef<THREE.Group | null>(null);

  // Dynamic Angles & Damping
  const targetRotation = useRef({ x: 0.12, y: -0.45 });
  const currentRotation = useRef({ x: 0.12, y: -0.45 });
  const targetOpenAngle = useRef(0.0);
  const currentOpenAngle = useRef(0.0);
  const targetCameraZ = useRef(14.8);
  const currentCameraZ = useRef(14.8);

  // Pointer & Touch Tracking
  const isPointerDownRef = useRef(false);
  const pointerStartPos = useRef({ x: 0, y: 0 });
  const lastPointerPos = useRef({ x: 0, y: 0 });
  const touchStartDistance = useRef<number | null>(null);

  // 1. Texture Bakers (High DPI Crisp Vector Rendering)
  const bakeCoverTexture = useCallback((type: "front" | "back" | "spine" | "inside_spread" | "endpaper") => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    if (type === "spine") {
      canvas.width = 400;
      canvas.height = 2560;
      ctx.fillStyle = "#f8f5ee";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spine edge gradients
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
      // Top of pages block: Title Page & Table of Contents
      canvas.width = 1600;
      canvas.height = 2560;
      ctx.fillStyle = "#fcf9f2"; // Creamy Bookpaper
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Inner book gutter shadow
      const gutter = ctx.createLinearGradient(0, 0, 120, 0);
      gutter.addColorStop(0, "rgba(0,0,0,0.14)");
      gutter.addColorStop(1, "rgba(0,0,0,0.0)");
      ctx.fillStyle = gutter;
      ctx.fillRect(0, 0, 120, canvas.height);

      // Header
      ctx.fillStyle = "#0284c7";
      ctx.font = "bold 40px sans-serif";
      ctx.fillText("DAFTAR ISI & SILABUS MATERI", 140, 240);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 84px sans-serif";
      ctx.fillText("Belajar Desain Grafis", 140, 360);

      ctx.fillStyle = "#e11d48";
      ctx.font = "italic 48px serif";
      ctx.fillText("Kurikulum Praktis Edisi Pemula", 140, 430);

      // Divider
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(140, 480);
      ctx.lineTo(1460, 480);
      ctx.stroke();

      // Chapters
      const chapters = [
        {
          num: "BAB 01",
          title: "Fondasi Nalar Visual & Prinsip Gestalt",
          desc: "Keseimbangan, kontras, ritme, dan hukum kedekatan visual.",
          page: "Hal. 14",
        },
        {
          num: "BAB 02",
          title: "Harmoni Warna CMYK & Psikologi Persepsi",
          desc: "Spektrum warna cetak, kalibrasi profil, dan makna emosional.",
          page: "Hal. 68",
        },
        {
          num: "BAB 03",
          title: "Arsitektur Tipografi & Skala Proporsi",
          desc: "Anatomi huruf, leading, kerning, dan keterbacaan teks panjang.",
          page: "Hal. 124",
        },
        {
          num: "BAB 04",
          title: "Eksekusi Proyek Nyata & Portofolio Industri",
          desc: "Pola pisau pond, garis lipatan, ekspor siap cetak, dan presentasi.",
          page: "Hal. 192",
        },
      ];

      chapters.forEach((ch, idx) => {
        const y = 620 + idx * 380;
        ctx.fillStyle = "#0284c7";
        ctx.font = "bold 38px monospace";
        ctx.fillText(ch.num, 140, y);

        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 56px sans-serif";
        ctx.fillText(ch.title, 140, y + 68);

        ctx.fillStyle = "#64748b";
        ctx.font = "38px sans-serif";
        ctx.fillText(ch.desc, 140, y + 130);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "600 34px monospace";
        ctx.fillText(ch.page, 1340, y + 68);

        ctx.strokeStyle = "#f1f5f9";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(140, y + 210);
        ctx.lineTo(1460, y + 210);
        ctx.stroke();
      });

      return new THREE.CanvasTexture(canvas);
    }

    if (type === "endpaper") {
      // Inside front cover: Decorative endpaper (flyleaf)
      canvas.width = 1600;
      canvas.height = 2560;
      ctx.fillStyle = "#f5efe2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Elegant repeating geometric lattice
      ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
      ctx.lineWidth = 3;
      for (let x = 0; x < canvas.width; x += 80) {
        for (let y = 0; y < canvas.height; y += 80) {
          ctx.strokeRect(x, y, 60, 60);
        }
      }

      ctx.fillStyle = "#334155";
      ctx.font = "italic 44px 'Georgia', serif";
      ctx.textAlign = "center";
      ctx.fillText('"Desain yang baik adalah pesan yang dapat dipahami tanpa kata terucap."', 800, 1280);

      return new THREE.CanvasTexture(canvas);
    }

    // Default Front & Back
    canvas.width = 1600;
    canvas.height = 2560;
    ctx.fillStyle = "#fbf8f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (type === "front") {
      const colors = ["#0284c7", "#f43f5e", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"];
      const size = 36;
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 14; c++) {
          ctx.fillStyle = colors[(r * 14 + c) % colors.length];
          ctx.fillRect(100 + c * size, 100 + r * size, size, size);
        }
      }

      ctx.fillStyle = "#0284c7";
      ctx.font = "bold 44px sans-serif";
      ctx.fillText("PANDUAN LENGKAP & STUDI KASUS", 100, 360);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 130px sans-serif";
      ctx.fillText("Belajar", 100, 520);
      ctx.fillText("Desain", 100, 660);
      ctx.fillText("Grafis", 100, 800);

      ctx.fillStyle = "#e11d48";
      ctx.font = "italic 700 84px 'Georgia', serif";
      ctx.fillText("Untuk Pemula", 100, 920);

      // Splash & Pen
      ctx.save();
      ctx.translate(850, 1500);
      const splashColors = [
        "rgba(244, 63, 94, 0.45)",
        "rgba(249, 115, 22, 0.45)",
        "rgba(234, 179, 8, 0.50)",
        "rgba(34, 197, 94, 0.45)",
        "rgba(14, 165, 233, 0.50)",
        "rgba(168, 85, 247, 0.40)",
      ];
      splashColors.forEach((col, idx) => {
        ctx.fillStyle = col;
        ctx.beginPath();
        const angle = (idx * Math.PI) / 3;
        const dist = 80 + (idx % 2) * 40;
        ctx.arc(Math.cos(angle) * dist, Math.sin(angle) * dist, 120 + (idx % 3) * 25, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(-20, -180);
      ctx.lineTo(120, 160);
      ctx.stroke();

      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.roundRect(-150, -150, 180, 180, 24);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 96px sans-serif";
      ctx.fillText("Ps", -120, -25);
      ctx.restore();

      ctx.fillStyle = "#334155";
      ctx.font = "600 52px sans-serif";
      ctx.fillText("Aaliyah Lusianti, M.Ds.", 100, 2280);
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 44px sans-serif";
      ctx.fillText("LITERASI NUSANTARA", 1050, 2350);
    } else {
      // Back cover
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 68px sans-serif";
      ctx.fillText("Tentang Buku Ini", 140, 260);

      ctx.fillStyle = "#334155";
      ctx.font = "40px sans-serif";
      const lines = [
        "Desain grafis bukan sekadar kemampuan mengoperasikan software,",
        "melainkan ketajaman menyusun hierarki visual, memilih tipografi,",
        "dan menyampaikan pesan yang memikat nurani pembaca.",
        "",
        "Kurikulum Terstruktur:",
        "• Prinsip Gestalt & Keseimbangan Visual",
        "• Harmoni Warna CMYK & Spektrum Cetak",
        "• Anatomi Tipografi & Skala Proporsi",
        "• Portofolio Nyata Standar Industri"
      ];
      lines.forEach((ln, i) => {
        ctx.fillText(ln, 140, 360 + i * 65);
      });

      // Barcode
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(950, 2050, 520, 320);
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      ctx.strokeRect(950, 2050, 520, 320);
      ctx.fillStyle = "#000000";
      for (let b = 0; b < 48; b++) {
        const w = (b % 3 === 0 ? 8 : (b % 2 === 0 ? 4 : 3));
        ctx.fillRect(990 + b * 9.5, 2090, w, 190);
      }
      ctx.font = "bold 34px monospace";
      ctx.fillText("ISBN 978-623-7123-45-8", 1000, 2330);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  // 2. Texture Baker for Packaging Box
  const bakeBoxTexture = useCallback((type: "top" | "side" | "inside") => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = 1200;
    canvas.height = 1200;
    ctx.fillStyle = type === "inside" ? "#faf6ed" : "#f5efe2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (type === "top") {
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 72px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("PREMIUM PACKAGING", 600, 520);

      ctx.fillStyle = "#0284c7";
      ctx.font = "600 36px sans-serif";
      ctx.fillText("FEFCO 0427 E-FLUTE STANDARD", 600, 600);

      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 8;
      ctx.strokeRect(180, 180, 840, 840);
    } else if (type === "inside") {
      ctx.fillStyle = "#0284c7";
      ctx.font = "bold 64px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("UNBOXING EXPERIENCE", 600, 560);

      ctx.fillStyle = "#64748b";
      ctx.font = "36px sans-serif";
      ctx.fillText("Terima Kasih Atas Kepercayaan Anda", 600, 640);
    } else {
      ctx.fillStyle = "#334155";
      ctx.font = "bold 44px monospace";
      ctx.textAlign = "center";
      ctx.fillText("FRAGILE • HANDLE WITH CARE", 600, 600);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  // 3. Assemble Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    try {
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 560;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
      camera.position.set(0, 0.4, currentCameraZ.current);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      rendererRef.current = renderer;

      container.replaceChildren(renderer.domElement);

      // Studio 3-Point Lighting
      const keyLight = new THREE.DirectionalLight(0xfffbf2, 1.95);
      keyLight.position.set(6, 11, 8);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.85);
      fillLight.position.set(-7, 4, 6);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xfef08a, 1.25);
      rimLight.position.set(3, 2, -6);
      scene.add(rimLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      // Contact Shadow Plane
      const shadowGeo = new THREE.PlaneGeometry(32, 32);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.35 });
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = -3.8;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      // --- MODEL 1: BUKU DENGAN ENGSEL SAMPUL BISA DIBUKA ---
      const bookRoot = new THREE.Group();
      bookRootGroup.current = bookRoot;

      const bookW = 5.0;
      const bookH = 7.4;
      const bookD = 0.58;

      const frontTex = bakeCoverTexture("front");
      const backTex = bakeCoverTexture("back");
      const spineTex = bakeCoverTexture("spine");
      const endpaperTex = bakeCoverTexture("endpaper");
      const spreadTex = bakeCoverTexture("inside_spread");

      const frontMat = new THREE.MeshPhysicalMaterial({
        map: frontTex,
        roughness: 0.6,
        metalness: 0.04,
        clearcoat: 0.3,
        clearcoatRoughness: 0.15,
      });

      const endpaperMat = new THREE.MeshStandardMaterial({
        map: endpaperTex,
        roughness: 0.85,
      });

      const backMat = new THREE.MeshPhysicalMaterial({
        map: backTex,
        roughness: 0.62,
        metalness: 0.04,
      });

      const spineMat = new THREE.MeshPhysicalMaterial({
        map: spineTex,
        roughness: 0.58,
        metalness: 0.08,
      });

      const spreadMat = new THREE.MeshStandardMaterial({
        map: spreadTex,
        roughness: 0.88,
      });

      const paperEdgeMat = new THREE.MeshStandardMaterial({
        color: 0xf6efe2,
        roughness: 0.88,
      });

      // Pages Block (Inside Book)
      const pagesGeo = new THREE.BoxGeometry(bookW - 0.22, bookH - 0.2, bookD - 0.08);
      const pagesMesh = new THREE.Mesh(pagesGeo, [
        paperEdgeMat, paperEdgeMat, paperEdgeMat, paperEdgeMat,
        spreadMat, // Top exposed spread (Title & TOC)
        paperEdgeMat,
      ]);
      pagesMesh.position.set(0.1, 0, 0);
      pagesMesh.castShadow = true;
      pagesMesh.receiveShadow = true;
      bookRoot.add(pagesMesh);

      // Back Board
      const backBoardGeo = new THREE.BoxGeometry(bookW, bookH, 0.06);
      const backBoardMesh = new THREE.Mesh(backBoardGeo, [
        spineMat, spineMat, spineMat, spineMat,
        paperEdgeMat,
        backMat, // Back exterior
      ]);
      backBoardMesh.position.set(0, 0, -bookD / 2 - 0.03);
      backBoardMesh.castShadow = true;
      bookRoot.add(backBoardMesh);

      // Spine Cylinder
      const spineGeo = new THREE.CylinderGeometry(
        bookD / 2 + 0.03,
        bookD / 2 + 0.03,
        bookH,
        32,
        1,
        false,
        Math.PI / 2,
        Math.PI
      );
      const spineMesh = new THREE.Mesh(spineGeo, spineMat);
      spineMesh.position.set(-bookW / 2, 0, 0);
      spineMesh.castShadow = true;
      bookRoot.add(spineMesh);

      // FRONT COVER PIVOT HINGE (Left Edge Axis: x = -bookW/2)
      const frontHinge = new THREE.Group();
      frontHinge.position.set(-bookW / 2, 0, bookD / 2 + 0.03);
      bookFrontHinge.current = frontHinge;

      const frontBoardGeo = new THREE.BoxGeometry(bookW, bookH, 0.06);
      const frontBoardMesh = new THREE.Mesh(frontBoardGeo, [
        spineMat, spineMat, spineMat, spineMat,
        frontMat, // Front cover face
        endpaperMat, // Inside face (revealed when opened)
      ]);
      // Offset mesh so its left edge sits exactly at the pivot origin (0, 0, 0)
      frontBoardMesh.position.set(bookW / 2, 0, 0);
      frontBoardMesh.castShadow = true;
      frontHinge.add(frontBoardMesh);

      bookRoot.add(frontHinge);
      bookRoot.rotation.x = currentRotation.current.x;
      bookRoot.rotation.y = currentRotation.current.y;
      scene.add(bookRoot);

      // --- MODEL 2: BOX KEMASAN PRODUK DENGAN TUTUP BISA DIBUKA ---
      const boxRoot = new THREE.Group();
      boxRootGroup.current = boxRoot;

      const boxW = 6.2;
      const boxH = 2.4;
      const boxD = 4.8;

      const boxTopTex = bakeBoxTexture("top");
      const boxSideTex = bakeBoxTexture("side");
      const boxInsideTex = bakeBoxTexture("inside");

      const boxExteriorMat = new THREE.MeshStandardMaterial({
        map: boxTopTex,
        roughness: 0.72,
        metalness: 0.05,
      });

      const boxSideMat = new THREE.MeshStandardMaterial({
        map: boxSideTex,
        roughness: 0.75,
      });

      const boxInsideMat = new THREE.MeshStandardMaterial({
        map: boxInsideTex,
        roughness: 0.82,
      });

      // Box Base Bottom & Walls
      const boxBaseGeo = new THREE.BoxGeometry(boxW, boxH, boxD);
      const boxBaseMesh = new THREE.Mesh(boxBaseGeo, [
        boxSideMat, boxSideMat,
        boxInsideMat, // Inside floor
        boxSideMat,
        boxSideMat, boxSideMat,
      ]);
      boxBaseMesh.position.set(0, -boxH / 2, 0);
      boxBaseMesh.castShadow = true;
      boxBaseMesh.receiveShadow = true;
      boxRoot.add(boxBaseMesh);

      // Box Top Lid Flap with Rear Hinge
      const lidHinge = new THREE.Group();
      lidHinge.position.set(0, 0, -boxD / 2);
      boxLidHinge.current = lidHinge;

      const lidGeo = new THREE.BoxGeometry(boxW + 0.1, 0.08, boxD + 0.1);
      const lidMesh = new THREE.Mesh(lidGeo, [
        boxSideMat, boxSideMat,
        boxExteriorMat, // Top exterior
        boxInsideMat, // Inside top print
        boxSideMat, boxSideMat,
      ]);
      lidMesh.position.set(0, 0.04, boxD / 2);
      lidMesh.castShadow = true;
      lidHinge.add(lidMesh);

      boxRoot.add(lidHinge);
      boxRoot.position.set(0, -0.6, 0);
      boxRoot.visible = false; // Initially hidden (Book is Hero)
      scene.add(boxRoot);

      // 4. Animation Loop with Smooth Damping
      const animate = () => {
        const activeGroup = modelType === "book" ? bookRootGroup.current : boxRootGroup.current;

        if (activeGroup) {
          if (isAutoRotating && !isPointerDownRef.current) {
            targetRotation.current.y += 0.005;
          }

          // Smooth Euler Rotation Damping
          currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.09;
          currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.09;
          activeGroup.rotation.y = currentRotation.current.y;
          activeGroup.rotation.x = currentRotation.current.x;
        }

        // Smooth Hinge Opening Damping
        currentOpenAngle.current += (targetOpenAngle.current - currentOpenAngle.current) * 0.08;

        if (bookFrontHinge.current) {
          bookFrontHinge.current.rotation.y = currentOpenAngle.current;
        }
        if (boxLidHinge.current) {
          boxLidHinge.current.rotation.x = currentOpenAngle.current * 0.72; // Adjusted for lid tilt
        }

        // Smooth Camera Zoom Damping
        if (cameraRef.current) {
          currentCameraZ.current += (targetCameraZ.current - currentCameraZ.current) * 0.1;
          cameraRef.current.position.z = currentCameraZ.current;
        }

        renderer.render(scene, camera);
        animFrameId.current = requestAnimationFrame(animate);
      };

      animate();

      // Handle Resize
      const handleResize = () => {
        if (!container || !rendererRef.current || !cameraRef.current) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
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
  }, [bakeCoverTexture, bakeBoxTexture, modelType, isAutoRotating]);

  // Model Switch Handler
  const switchModel = (type: "book" | "box") => {
    setModelType(type);
    setIsOpen(false);
    targetOpenAngle.current = 0.0;
    targetRotation.current = type === "book" ? { x: 0.12, y: -0.45 } : { x: 0.28, y: -0.55 };

    if (bookRootGroup.current) bookRootGroup.current.visible = type === "book";
    if (boxRootGroup.current) boxRootGroup.current.visible = type === "box";
  };

  // Toggle Open/Close Kinematics
  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    setIsAutoRotating(false);

    if (nextState) {
      // Open
      targetOpenAngle.current = modelType === "book" ? -2.75 : -1.85; // -160° for book, -105° for box
      targetRotation.current = modelType === "book" ? { x: 0.18, y: -0.15 } : { x: 0.35, y: -0.2 };
      setActiveAngle("open");
    } else {
      // Close
      targetOpenAngle.current = 0.0;
      targetRotation.current = modelType === "book" ? { x: 0.12, y: -0.45 } : { x: 0.28, y: -0.55 };
      setActiveAngle("front");
    }
  };

  // Preset Angles
  const setPresetAngle = (preset: "front" | "open" | "spine") => {
    setActiveAngle(preset);
    setIsAutoRotating(false);

    if (preset === "front") {
      targetOpenAngle.current = 0.0;
      setIsOpen(false);
      targetRotation.current = { x: 0.0, y: 0.0 };
    } else if (preset === "open") {
      targetOpenAngle.current = modelType === "book" ? -2.75 : -1.85;
      setIsOpen(true);
      targetRotation.current = { x: 0.2, y: -0.15 };
    } else if (preset === "spine") {
      targetOpenAngle.current = 0.0;
      setIsOpen(false);
      targetRotation.current = { x: 0.06, y: 2.75 };
    }
  };

  // Pointer Drag Handlers (1 Finger / Mouse)
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

    // Direct Click to Open Detection (movement < 6px)
    const dist = Math.hypot(
      e.clientX - pointerStartPos.current.x,
      e.clientY - pointerStartPos.current.y
    );
    if (dist < 6) {
      toggleOpen();
    }
  };

  // Multi-Touch Pinch-to-Zoom (2 Fingers)
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
      const delta = currentDist - touchStartDistance.current;

      // Pinch zoom camera
      targetCameraZ.current = Math.max(7.0, Math.min(22.0, targetCameraZ.current - delta * 0.035));
      touchStartDistance.current = currentDist;
    }
  };

  const handleTouchEnd = () => {
    touchStartDistance.current = null;
  };

  // Wheel Zoom (Desktop)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetCameraZ.current = Math.max(7.0, Math.min(22.0, targetCameraZ.current + e.deltaY * 0.015));
  };

  const zoomIn = () => {
    targetCameraZ.current = Math.max(7.0, targetCameraZ.current - 2.0);
  };

  const zoomOut = () => {
    targetCameraZ.current = Math.min(22.0, targetCameraZ.current + 2.0);
  };

  const resetZoom = () => {
    targetCameraZ.current = 14.8;
  };

  if (webglError) {
    return (
      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-sm flex items-center justify-center p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fallbackImage}
          alt="3D Mockup Fisik"
          className="max-h-full object-contain filter drop-shadow-xl"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200/90 bg-gradient-to-b from-[#FAF7F2] to-[#F3EFE6] shadow-sm select-none">
      {/* Top Controls Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Specimen Switcher (Dual Pillars: Book vs Box) */}
        <div className="pointer-events-auto flex items-center gap-1 bg-white/95 p-1 rounded-xl border border-zinc-200/90 shadow-xs backdrop-blur-xs">
          <button
            type="button"
            onClick={() => switchModel("book")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              modelType === "book"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Spesimen 1: Buku Hardcover</span>
          </button>

          <button
            type="button"
            onClick={() => switchModel("box")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              modelType === "box"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Spesimen 2: Dus Kemasan Box</span>
          </button>
        </div>

        {/* Action Presets */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 p-1 rounded-xl border border-zinc-200/90 shadow-xs backdrop-blur-xs">
          <button
            type="button"
            onClick={toggleOpen}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              isOpen
                ? "bg-teal-700 text-white"
                : "bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200"
            }`}
          >
            {isOpen ? <Book className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
            <span>
              {modelType === "book"
                ? isOpen
                  ? "Tutup Sampul"
                  : "Klik Buka Sampul & Lembaran"
                : isOpen
                ? "Tutup Box"
                : "Klik Buka Tutup Box"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPresetAngle("front")}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              activeAngle === "front" && !isOpen
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            Depan
          </button>

          <button
            type="button"
            onClick={() => setPresetAngle("spine")}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              activeAngle === "spine"
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            {modelType === "book" ? "Punggung & ISBN" : "Sisi Samping"}
          </button>
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
        className={`w-full h-[500px] sm:h-[600px] cursor-grab active:cursor-grabbing touch-none ${
          isDragging ? "cursor-grabbing" : ""
        }`}
      />

      {/* Floating Zoom Controls (Bottom Right) */}
      <div className="absolute top-20 right-4 z-10 flex flex-col gap-1 bg-white/95 p-1 rounded-xl border border-zinc-200/90 shadow-xs backdrop-blur-xs">
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
          title="Reset Jarak Kamera"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Floating Instructions Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 border border-zinc-200/80 backdrop-blur-xs shadow-xs text-zinc-700">
          <Compass className="w-3.5 h-3.5 text-teal-700" />
          <span>
            {modelType === "book"
              ? "Klik buku atau tombol untuk membuka sampul & daftar isi. Usap 2 jari untuk zoom."
              : "Klik box untuk melihat unboxing dan grafis bagian dalam. Usap 2 jari untuk zoom."}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isAutoRotating
                ? "bg-teal-50 text-teal-800 border-teal-200 shadow-2xs"
                : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? "animate-spin" : ""}`} />
            <span>{isAutoRotating ? "Putar Otomatis" : "Jeda Putar"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
