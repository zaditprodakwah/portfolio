'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PlaygroundClient {
  isReady: () => Promise<unknown>;
  goTo: (path: string) => Promise<unknown>;
  run: (opts: { code: string }) => Promise<{ errors?: unknown[]; text?: string }>;
}

export default function ElementorDemoPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState('Menyalakan WordPress di browser...');
  const [ready, setReady] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [sampleJson, setSampleJson] = useState('Memuat...');
  const clientRef = useRef<PlaygroundClient | null>(null);
  const homeIdRef = useRef(0);

  useEffect(() => {
    async function loadSampleJson() {
      try {
        const r = await fetch('/elementor-demo/templates/home.json');
        const raw = await r.text();
        const parsed = JSON.parse(raw);
        parsed.content.forEach((el: { elType?: string; elements?: unknown[] }) => {
          if (el.elType === 'container' && Array.isArray(el.elements)) {
            el.elements = el.elements.slice(0, 1);
            const first = el.elements[0] as { elements?: unknown[] } | undefined;
            if (first && Array.isArray(first.elements)) first.elements = [];
          }
        });
        setSampleJson(
          JSON.stringify(parsed, null, 2).slice(0, 2600) + '\n// ... (terpotong)'
        );
      } catch (e) {
        setSampleJson('Gagal memuat contoh JSON: ' + (e as Error).message);
      }
    }

    async function boot() {
      await loadSampleJson();

      const clientUrl = 'https://playground.wordpress.net/client/index.js';
      const { startPlaygroundWeb } = await import(
        /* webpackIgnore: true */
        clientUrl
      );
      const blueprintRes = await fetch('/elementor-demo/blueprint.json');
      const blueprint = await blueprintRes.json();

      const client = (await startPlaygroundWeb({
        iframe: iframeRef.current as HTMLIFrameElement,
        remoteUrl: 'https://playground.wordpress.net/remote.html',
        blueprint,
      })) as unknown as PlaygroundClient;
      clientRef.current = client;

      setStatus('WordPress siap. Menginstall Elementor dan mengimpor halaman...');
      await client.isReady();

      const id = await getHomeId(client);
      homeIdRef.current = id;
      setReady(true);
      setStatus('Selesai. Halaman home ditampilkan di bawah. Klik tombol untuk menjelajah.');
    }

    async function getHomeId(client: PlaygroundClient) {
      try {
        const res = await client.run({
          code: `<?php require '/wordpress/wp-load.php'; echo (int) get_option( 'page_on_front' );`,
        });
        const text = res.errors ? '' : res.text || '';
        const match = String(text).trim().match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      } catch (e) {
        console.warn('getHomeId gagal:', e);
        return 0;
      }
    }

    boot().catch((err) => {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
      setStatus('Gagal memuat demo: ' + (err instanceof Error ? err.message : String(err)));
      setReady(false);
    });
  }, []);

  const go = (path: string) => clientRef.current?.goTo(path);

  return (
    <main className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-teal-500/10 via-teal-900/5 to-transparent blur-3xl rounded-full" />

      <section className="relative pt-14 md:pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/40 px-3.5 py-1.5 text-xs font-mono font-medium text-teal-300 backdrop-blur-md">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-teal-400 animate-ping motion-reduce:animate-none" />
            WORDPRESS PLAYGROUND &middot; ELEMENTOR JSON IMPORT
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Landing Elementor, Lahir Dari{' '}
            <span className="bg-gradient-to-r from-teal-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
              File JSON
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            WordPress asli dijalankan di dalam browser tanpa server. Demo ini menginstall
            Elementor dan tema Hello Elementor, lalu memuat landing brand conference berbahasa
            Inggris dengan 83 widget gratis serta halaman service dan contact. Setiap halaman
            disunting langsung lewat Editor Elementor dari file JSON format version 0.4.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 p-3 border-b border-slate-800/80 bg-slate-900/80">
            <button
              type="button"
              onClick={() => go('/')}
              disabled={!ready}
              className="rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 text-xs transition-all shadow-lg shadow-teal-500/20 disabled:opacity-40 disabled:cursor-wait"
            >
              Halaman (Front End)
            </button>
            <button
              type="button"
              onClick={() => go('/wp-login.php')}
              disabled={!ready}
              className="rounded-lg border border-slate-700 bg-slate-900/80 hover:border-teal-500 text-slate-200 font-medium px-4 py-2 text-xs transition-all disabled:opacity-40 disabled:cursor-wait"
            >
              Login wp-admin
            </button>
            <button
              type="button"
              onClick={() =>
                homeIdRef.current &&
                go(`/wp-admin/post.php?post=${homeIdRef.current}&action=elementor`)
              }
              disabled={!ready || !homeIdRef.current}
              className="rounded-lg border border-slate-700 bg-slate-900/80 hover:border-teal-500 text-slate-200 font-medium px-4 py-2 text-xs transition-all disabled:opacity-40 disabled:cursor-wait"
            >
              Editor Elementor
            </button>
            <span role="status" aria-live="polite" className="ml-auto text-xs font-mono text-slate-300">{status}</span>
          </div>

          <iframe
            ref={iframeRef}
            title="WordPress Playground dengan Elementor"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
            className="w-full h-[70vh] bg-white"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div>
            <h2 className="text-lg font-bold font-heading text-white mb-3">
              Bagaimana halaman ini dibuat
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3 max-w-[72ch]">
              Halaman di atas adalah WordPress Playground (WordPress asli di browser, no server).
              Blueprint menginstall Elementor &amp; tema <code className="font-mono text-xs text-teal-300">Hello Elementor</code>,
              lalu mengimpor tiga halaman dari file JSON Elementor (format{' '}
              <code className="font-mono text-xs text-teal-300">version 0.4</code>). Setiap halaman
              disimpan sebagai <code className="font-mono text-xs text-teal-300">_elementor_data</code>,
              persis seperti ekspor template asli Elementor.
            </p>
            <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
              <li>Landing home memakai 83 widget, seluruhnya dari library gratis Elementor (heading, teks, tombol, counter, accordion, galeri, peta, ikon media sosial, dsb.). Garansi tanpa widget Pro ini diverifikasi dari source code resmi <code className="font-mono text-xs text-teal-300">elementor/elementor</code> di GitHub.</li>
              <li>Plugin Elementor 4.2.4 dan tema Hello disimpan sebagai arsip di domain ini, lalu dirujuk lewat <code className="font-mono text-xs text-teal-300">UrlReference</code> pada schema blueprint WordPress Playground. Idempoten dan tidak bergantung pada meta refresh downloads.wordpress.org yang gagal diproses browser.</li>
              <li>Halaman tetap 100% bisa disunting lewat Editor Elementor setelah impor.</li>
            </ul>
            <p className="text-sm text-slate-300 leading-relaxed mt-3 max-w-[72ch]">
              Inilah bentuk deliverable untuk proyek &ldquo;halaman Elementor berbasis JSON&rdquo;:
              satu file <code className="font-mono text-xs text-teal-300">.json</code> per halaman,
              siap diimpor di instalasi WordPress klien, dengan desain yang sepenuhnya bebas dari
              ketergantungan lisensi Pro.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold font-heading text-white mb-3">
              Contoh struktur JSON
            </h2>
            <pre className="rounded-xl bg-slate-950 border border-slate-800/80 p-4 max-h-80 overflow-auto text-xs leading-relaxed text-teal-200 whitespace-pre-wrap break-words">
              {sampleJson}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}