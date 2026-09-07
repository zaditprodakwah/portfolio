"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, ExternalLink, Info } from "lucide-react";
import { ENTITY_NODES, type EntityNode } from "@/lib/entity-graph";

interface EntityPillsProps {
  entityIds: string[];
  title?: string;
  lang?: "id" | "en";
}

export function EntityPills({
  entityIds,
  title = "Topik & Entitas Terkait",
  lang = "id",
}: EntityPillsProps) {
  const [selectedEntity, setSelectedEntity] = useState<EntityNode | null>(null);

  const nodes = entityIds
    .map((id) => ENTITY_NODES[id])
    .filter((n): n is EntityNode => Boolean(n));

  if (nodes.length === 0) return null;

  return (
    <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs not-prose">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-teal-600" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {title}
          </span>
        </div>
        <Link
          href="/wawasan"
          className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
        >
          <span>{lang === "id" ? "Glosarium Lengkap" : "Full Glossary"}</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setSelectedEntity(selectedEntity?.id === node.id ? null : node)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              selectedEntity?.id === node.id
                ? "bg-teal-700 text-white border-teal-800 shadow-xs"
                : "bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/50"
            }`}
          >
            <span>{node.name}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-500 font-normal">
              {node.level}
            </span>
          </button>
        ))}
      </div>

      {/* Tooltip / Penjelasan Singkat Saat Entitas Dipilih */}
      {selectedEntity && (
        <div className="mt-3 p-3.5 rounded-xl bg-white border border-teal-200 text-slate-700 text-xs leading-relaxed transition-all animate-fadeIn">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{selectedEntity.name}</span>
            </div>
            <a
              href={selectedEntity.wikidataUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-teal-700 hover:underline flex items-center gap-1 font-mono"
            >
              <span>Wikidata</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <p className="text-slate-600 mb-2">{selectedEntity.description}</p>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <span>Kata Kunci Terkait:</span>
            <span className="italic">{selectedEntity.aliases.join(", ")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
