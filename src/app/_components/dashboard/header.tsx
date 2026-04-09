import { sharedStyles } from "../../utils/shared-styles";
import { Copy, Edit3, Eye, Share2, Check } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";

type DashboardHeaderProps = {
  websiteUrl: string | undefined;
  setShowWebsiteSettings: Dispatch<SetStateAction<boolean>>;
};

export default function DashboardHeader({
  websiteUrl,
  setShowWebsiteSettings,
}: DashboardHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(websiteUrl ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Website</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white">Your Wedding Website</h1>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-950/50 border border-zinc-800 backdrop-blur-sm">
              <span className="text-xs font-mono text-zinc-500">{websiteUrl}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
              
              <button
                onClick={() => setShowWebsiteSettings(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95"
              >
                <Edit3 className="h-3.5 w-3.5" />
                Edit Settings
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button className={sharedStyles.secondaryButton({ px: "px-6", py: "py-3" })}>
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span>Share Site</span>
            </div>
          </button>
          <a 
            href={websiteUrl} 
            target="_blank" 
            rel="noreferrer" 
            className={sharedStyles.primaryButton({ px: "px-8", py: "py-3" })}
          >
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Preview Live</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
