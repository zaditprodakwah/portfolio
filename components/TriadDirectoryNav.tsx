import Link from "next/link";

interface TriadDirectoryNavProps {
  activeTab: "layanan" | "solusi" | "wawasan";
}

export default function TriadDirectoryNav({ activeTab }: TriadDirectoryNavProps) {
  const tabs = [
    { id: "layanan", label: "Layanan Modular", href: "/layanan/", count: "4 Pilar" },
    { id: "solusi", label: "Solusi Terarah", href: "/solusi/", count: "Studi Kasus" },
    { id: "wawasan", label: "Wawasan & Teardown", href: "/wawasan/", count: "Analisis Kritis" },
  ];

  return (
    <nav aria-label="Navigasi Direktori Triad" className="mb-10 w-full">
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs md:text-sm font-medium transition-all ${
                isActive
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  isActive
                    ? "bg-zinc-800 text-zinc-200"
                    : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-800"
                }`}
              >
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
