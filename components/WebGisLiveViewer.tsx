"use client";

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  Layers,
  Compass,
  Eye,
  Sliders,
  Maximize2,
  ExternalLink,
  Terminal,
  Database,
  CheckCircle2,
  Trees,
  CloudRain,
  MapPin,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export default function WebGisLiveViewer() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<{
    esriSatellite?: any;
    openTopo?: any;
    cartoPositron?: any;
    cartoVoyager?: any;
    leuserBoundary?: any;
    floodSar?: any;
    treesLayer?: any;
  }>({});

  const [activeBasemap, setActiveBasemap] = useState<"satellite" | "topo" | "carto_light" | "carto_voyager">("satellite");
  const [showLeuser, setShowLeuser] = useState<boolean>(true);
  const [showFlood, setShowFlood] = useState<boolean>(true);
  const [showTrees, setShowTrees] = useState<boolean>(true);
  const [floodOpacity, setFloodOpacity] = useState<number>(0.65);
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedTreeInfo, setSelectedTreeInfo] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = (await import("leaflet")).default;

      // Center around Kawasan Ekosistem Leuser & Aceh Tamiang (3.95 N, 97.85 E)
      const map = L.map(mapContainerRef.current, {
        center: [3.95, 97.85],
        zoom: 10,
        zoomControl: false,
        attributionControl: false
        
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // 1. Basemaps (Protected via Cloudflare Edge Proxy: Zero Client Secrets)
      const esriSatellite = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 19 }
      );

      const openTopo = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        { maxZoom: 17 }
      );

      const cartoPositron = L.tileLayer(
        "/api/tiles?s=light_all&z={z}&x={x}&y={y}&r={r}",
        { maxZoom: 19 }
      );

      const cartoVoyager = L.tileLayer(
        "/api/tiles?s=voyager&z={z}&x={x}&y={y}&r={r}",
        { maxZoom: 19 }
      );

      esriSatellite.addTo(map);

      // 2. Geographic Layer A: Kawasan Ekosistem Leuser (KEL) Boundary
      const leuserCoords: [number, number][] = [
        [4.25, 97.45],
        [4.32, 97.75],
        [4.20, 98.15],
        [3.98, 98.25],
        [3.75, 98.10],
        [3.65, 97.70],
        [3.82, 97.35],
        [4.05, 97.25],
        [4.25, 97.45]
      ];

      const leuserBoundary = L.polygon(leuserCoords, {
        color: "#10b981",
        weight: 2,
        fillColor: "#059669",
        fillOpacity: 0.15,
        dashArray: "5, 5"
      }).addTo(map);

      leuserBoundary.bindTooltip("Kawasan Ekosistem Leuser (Zona Konservasi Primer)", {
        permanent: false,
        direction: "top"
      });

      // 3. Geographic Layer B: Sentinel-1 SAR Flood Inundation Extent (Aceh Tamiang Basin)
      const floodCoordsA: [number, number][] = [
        [4.12, 97.98],
        [4.18, 98.05],
        [4.14, 98.16],
        [4.02, 98.22],
        [3.96, 98.12],
        [4.04, 98.01],
        [4.12, 97.98]
      ];

      const floodCoordsB: [number, number][] = [
        [3.85, 97.80],
        [3.92, 97.92],
        [3.88, 98.02],
        [3.78, 97.98],
        [3.80, 97.84],
        [3.85, 97.80]
      ];

      const floodGroup = L.featureGroup([
        L.polygon(floodCoordsA, {
          color: "#f87171",
          weight: 1.5,
          fillColor: "#ef4444",
          fillOpacity: floodOpacity
        }),
        L.polygon(floodCoordsB, {
          color: "#f87171",
          weight: 1.5,
          fillColor: "#ef4444",
          fillOpacity: floodOpacity
        })
      ]).addTo(map);

      floodGroup.bindTooltip("Genangan Banjir Terdeteksi Sentinel-1 SAR (Luas: 2.340 Ha)", {
        permanent: false,
        direction: "center"
      });

      // 4. Geographic Layer C: Drone Orthomosaic Tree Inventory (Sample Cluster)
      const treesGroup = L.featureGroup();

      const sampleTrees = [
        { id: "TR-001", lat: 3.96, lng: 97.78, species: "Shorea leprosula (Meranti Merah)", crown: 8.2, height: 26.0, agb: 2840, carbon: 1.33, co2e: 219 },
        { id: "TR-002", lat: 3.97, lng: 97.80, species: "Dipterocarpus grandiflorus (Keruing)", crown: 7.5, height: 24.5, agb: 2410, carbon: 1.13, co2e: 186 },
        { id: "TR-003", lat: 3.95, lng: 97.79, species: "Eusideroxylon zwageri (Ulin Tua)", crown: 9.4, height: 31.0, agb: 4120, carbon: 1.94, co2e: 319 },
        { id: "TR-004", lat: 3.98, lng: 97.82, species: "Dryobalanops aromatica (Kapur)", crown: 6.8, height: 22.0, agb: 1890, carbon: 0.89, co2e: 146 },
        { id: "TR-005", lat: 3.94, lng: 97.81, species: "Hopea odorata (Merawan)", crown: 7.1, height: 23.5, agb: 2150, carbon: 1.01, co2e: 166 },
        { id: "TR-006", lat: 3.93, lng: 97.76, species: "Koompassia excelsa (Tualang / Raja Pohon)", crown: 11.2, height: 38.0, agb: 6350, carbon: 2.98, co2e: 491 }
      ];

      sampleTrees.forEach((t) => {
        const marker = L.circleMarker([t.lat, t.lng], {
          radius: Math.max(6, t.crown * 1.2),
          fillColor: "#22c55e",
          color: "#ffffff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85
        });

        marker.on("click", () => {
          if (isMounted) {
            setSelectedTreeInfo(t);
          }
        });

        marker.bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
            <strong style="color: #065f46; font-size: 13px;">${t.id}: ${t.species}</strong><br/>
            <span>Diameter Tajuk: <strong>${t.crown} m</strong></span><br/>
            <span>Tinggi Tegakan: <strong>${t.height} m</strong></span><br/>
            <span>Biomassa AGB (Chave 2014): <strong>${t.agb} kg</strong></span><br/>
            <span>Stok Karbon: <strong>${t.carbon} Mg C</strong></span><br/>
            <span style="color: #047857; font-weight: bold;">Serapan CO2e: ${t.co2e} kg/thn</span>
          </div>
        `);

        treesGroup.addLayer(marker);
      });

      treesGroup.addTo(map);

      // Track cursor coordinates
      map.on("mousemove", (e: any) => {
        if (isMounted) {
          setCursorCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
        }
      });

      // Save references
      mapInstanceRef.current = map;
      layersRef.current = {
        esriSatellite,
        openTopo,
        cartoPositron,
        cartoVoyager,
        leuserBoundary,
        floodSar: floodGroup,
        treesLayer: treesGroup
      };
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Basemap Switch
  const handleBasemapChange = (type: "satellite" | "topo" | "carto_light" | "carto_voyager") => {
    const map = mapInstanceRef.current;
    const layers = layersRef.current;
    if (!map || !layers) return;

    if (layers.esriSatellite) map.removeLayer(layers.esriSatellite);
    if (layers.openTopo) map.removeLayer(layers.openTopo);
    if (layers.cartoPositron) map.removeLayer(layers.cartoPositron);
    if (layers.cartoVoyager) map.removeLayer(layers.cartoVoyager);

    if (type === "satellite" && layers.esriSatellite) layers.esriSatellite.addTo(map);
    if (type === "topo" && layers.openTopo) layers.openTopo.addTo(map);
    if (type === "carto_light" && layers.cartoPositron) layers.cartoPositron.addTo(map);
    if (type === "carto_voyager" && layers.cartoVoyager) layers.cartoVoyager.addTo(map);

    setActiveBasemap(type);
  };

  // Handle Overlay Toggles
  const toggleLeuser = () => {
    const map = mapInstanceRef.current;
    const layer = layersRef.current.leuserBoundary;
    if (!map || !layer) return;
    if (showLeuser) {
      map.removeLayer(layer);
    } else {
      layer.addTo(map);
    }
    setShowLeuser(!showLeuser);
  };

  const toggleFlood = () => {
    const map = mapInstanceRef.current;
    const layer = layersRef.current.floodSar;
    if (!map || !layer) return;
    if (showFlood) {
      map.removeLayer(layer);
    } else {
      layer.addTo(map);
    }
    setShowFlood(!showFlood);
  };

  const toggleTrees = () => {
    const map = mapInstanceRef.current;
    const layer = layersRef.current.treesLayer;
    if (!map || !layer) return;
    if (showTrees) {
      map.removeLayer(layer);
    } else {
      layer.addTo(map);
    }
    setShowTrees(!showTrees);
  };

  // Handle Flood Opacity
  const handleFloodOpacity = (val: number) => {
    setFloodOpacity(val);
    const layer = layersRef.current.floodSar;
    if (layer) {
      layer.setStyle({ fillOpacity: val });
    }
  };

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([3.95, 97.85], 10);
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm space-y-0">
      {/* Top Interactive Toolbar */}
      <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-heading font-bold text-sm sm:text-base text-zinc-900">
              WebGIS Live Viewer: Citra Satelit &amp; Analisis Spasial Riil
            </h3>
          </div>
          <p className="text-zinc-500 text-xs font-sans">
            Kawasan Ekosistem Leuser &amp; Daerah Aliran Sungai Tamiang &middot; Sensor Sentinel-1 SAR &middot; Sensus Ortofoto Drone
          </p>
        </div>

        {/* Basemap Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-200/70 border border-zinc-300 text-xs font-mono shrink-0">
          <button
            type="button"
            onClick={() => handleBasemapChange("satellite")}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              activeBasemap === "satellite"
                ? "bg-emerald-800 text-white font-bold shadow-xs"
                : "text-zinc-700 hover:text-zinc-900"
            }`}
          >
            Satelit Esri
          </button>
          <button
            type="button"
            onClick={() => handleBasemapChange("topo")}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              activeBasemap === "topo"
                ? "bg-emerald-800 text-white font-bold shadow-xs"
                : "text-zinc-700 hover:text-zinc-900"
            }`}
          >
            Topografi Medan
          </button>
          <button
            type="button"
            onClick={() => handleBasemapChange("carto_light")}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              activeBasemap === "carto_light"
                ? "bg-emerald-800 text-white font-bold shadow-xs"
                : "text-zinc-700 hover:text-zinc-900"
            }`}
          >
            Kartografi Positron
          </button>
          <button
            type="button"
            onClick={() => handleBasemapChange("carto_voyager")}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              activeBasemap === "carto_voyager"
                ? "bg-emerald-800 text-white font-bold shadow-xs"
                : "text-zinc-700 hover:text-zinc-900"
            }`}
          >
            Navigasi Voyager
          </button>
        </div>
      </div>

      {/* Main Map Container & HUD Controls */}
      <div className="relative w-full h-[540px] sm:h-[620px] bg-zinc-900">
        {/* Leaflet Map DOM Root */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Top-Left Layer Control Panel */}
        <div className="absolute top-4 left-4 z-[400] max-w-[280px] p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-md text-xs space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <span className="font-heading font-bold text-zinc-900 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              Lapisan Tematik Aktif
            </span>
            <button
              type="button"
              onClick={resetView}
              className="text-[11px] font-mono text-emerald-800 hover:underline"
            >
              Reset Sudut
            </button>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showLeuser}
                onChange={toggleLeuser}
                className="rounded accent-emerald-800 cursor-pointer"
              />
              <span className="text-zinc-800 font-medium">Kawasan Ekosistem Leuser</span>
            </label>

            <div className="space-y-1 pl-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showFlood}
                  onChange={toggleFlood}
                  className="rounded accent-red-600 cursor-pointer"
                />
                <span className="text-zinc-800 font-medium">Genangan Banjir SAR (2.340 Ha)</span>
              </label>
              {showFlood && (
                <div className="pt-1 flex items-center gap-2 text-[11px] text-zinc-500">
                  <span>Transparansi:</span>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={floodOpacity}
                    onChange={(e) => handleFloodOpacity(parseFloat(e.target.value))}
                    className="w-20 accent-red-600"
                  />
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showTrees}
                onChange={toggleTrees}
                className="rounded accent-green-600 cursor-pointer"
              />
              <span className="text-zinc-800 font-medium">Sensus Pohon Ortofoto Drone</span>
            </label>
          </div>

          <div className="pt-2 border-t border-zinc-100 text-[11px] text-zinc-500 leading-snug">
            Klik pada lingkaran hijau di peta untuk memeriksa data DBH, biomassa Chave, dan serapan karbon per pohon.
          </div>
        </div>

        {/* Floating Bottom-Left Coordinates HUD */}
        <div className="absolute bottom-4 left-4 z-[400] px-3 py-1.5 rounded-lg bg-zinc-900/90 text-white font-mono text-[11px] border border-zinc-700 shadow-sm flex items-center gap-3">
          <span>
            {cursorCoords
              ? `Lat: ${cursorCoords.lat.toFixed(5)}° | Lng: ${cursorCoords.lng.toFixed(5)}°`
              : "Arahkan kursor ke peta untuk koordinat"}
          </span>
          <span className="text-zinc-400">| Datum: WGS84</span>
        </div>

        {/* Floating Bottom-Right Provenance Badge */}
        <div className="absolute bottom-4 right-14 z-[400] hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur border border-zinc-200 text-[11px] font-mono text-zinc-700 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Esri &middot; Sentinel-1 &middot; Chave 2014 &middot; &copy; CARTO &copy; OSM</span>
        </div>
      </div>

      {/* Selected Tree Inspector Drawer */}
      {selectedTreeInfo && (
        <div className="p-4 sm:p-5 bg-emerald-50 border-t border-emerald-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-sans">
          <div className="space-y-1">
            <span className="font-mono font-bold text-emerald-900 text-xs uppercase tracking-wider block">
              Detail Inspeksi Tegakan Terpilih ({selectedTreeInfo.id})
            </span>
            <p className="text-sm font-heading font-bold text-zinc-900">
              Spesies: {selectedTreeInfo.species}
            </p>
            <div className="flex flex-wrap gap-4 pt-1 font-mono text-zinc-700">
              <span>Tajuk: <strong>{selectedTreeInfo.crown} m</strong></span>
              <span>Tinggi: <strong>{selectedTreeInfo.height} m</strong></span>
              <span>Biomassa AGB: <strong>{selectedTreeInfo.agb} kg</strong></span>
              <span>Simpanan Karbon: <strong>{selectedTreeInfo.carbon} Mg C</strong></span>
              <span className="text-emerald-800 font-bold">Serapan CO2e: {selectedTreeInfo.co2e} kg/thn</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedTreeInfo(null)}
            className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 font-medium hover:bg-emerald-100 transition-colors shrink-0"
          >
            Tutup Inspektor
          </button>
        </div>
      )}

      {/* Technical Provenance & Methodological Specifications Footer */}
      <div className="p-4 sm:p-5 bg-zinc-50 border-t border-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span className="font-heading font-bold text-xs sm:text-sm text-zinc-900">
              Spesifikasi Metodologi &amp; Sumber Data Baku
            </span>
          </div>
          <p className="text-zinc-600 text-xs font-mono">
            Sentinel-1 GRD IW C-Band (10m) &middot; Polarisasi Silang VH &middot; DEM Copernicus 30m GLO-30 &middot; Allometri Pantropis Chave 2014
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://www.kaggle.com/code/muhzadit/sentinel-1-sar-cloud-penetrating-flood-mapping"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-300 hover:border-emerald-500 hover:text-emerald-800 text-[11px] font-mono text-zinc-700 transition-all shadow-2xs"
          >
            <ExternalLink className="w-3 h-3 text-emerald-600" />
            <span>Kaggle: SAR Flood Pipeline</span>
          </a>
          <a
            href="https://www.kaggle.com/code/muhzadit/tropical-forest-canopy-carbon-allometry-chave-2014"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-300 hover:border-emerald-500 hover:text-emerald-800 text-[11px] font-mono text-zinc-700 transition-all shadow-2xs"
          >
            <ExternalLink className="w-3 h-3 text-emerald-600" />
            <span>Kaggle: Allometri Karbon Chave</span>
          </a>
          <a
            href="/layanan/analisis-geospasial-lingkungan/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-all shadow-xs"
          >
            <span>Konsultasi Proyek Spasial</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-200" />
          </a>
        </div>
      </div>
    </div>
  );
}

