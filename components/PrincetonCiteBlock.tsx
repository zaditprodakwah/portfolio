import { ExternalLink, Award } from "lucide-react";

interface PrincetonCiteBlockProps {
  metric: string;
  source: string;
  url?: string;
  contextNote?: string;
}

export default function PrincetonCiteBlock({
  metric,
  source,
  url,
  contextNote = "Data primer terverifikasi dari studi benchmark & otoritas institusi resmi.",
}: PrincetonCiteBlockProps) {
  return (
    <aside
      aria-label="Sitasi Data Primer Terverifikasi"
      className="my-8 rounded-xl border border-zinc-200/90 bg-gradient-to-br from-white to-zinc-50/50 p-5 md:p-6 shadow-xs"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center rounded-md bg-zinc-900 p-1 text-white">
              <Award className="h-3.5 w-3.5 text-amber-400" />
            </span>
            <span className="text-[11px] font-mono font-medium tracking-wide uppercase text-zinc-500">
              Princeton Citation Stacking • Data Primer
            </span>
          </div>
          <div className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900">
            {metric}
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed max-w-xl">
            {contextNote}
          </p>
        </div>

        <div className="pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100 flex flex-col md:items-end">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            Sumber Otoritatif:
          </span>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 hover:text-zinc-600 underline underline-offset-4 decoration-zinc-300 transition-colors"
            >
              <span>{source}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="mt-1 text-xs font-medium text-zinc-800">
              {source}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
