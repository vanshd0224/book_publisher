import React from 'react';
import { Award, ShieldCheck, Building2, Landmark, Stethoscope, Microscope, BookOpenCheck } from 'lucide-react';

export const TrustMarquee: React.FC = () => {
  const partners = [
    { name: 'AiMeD', label: 'Assoc. of Indian Medical Device Industry', icon: ShieldCheck, color: 'text-amber-400' },
    { name: 'MTaI', label: 'Medical Technology Assoc. of India', icon: Award, color: 'text-yellow-400' },
    { name: 'AMTZ', label: 'Andhra Pradesh MedTech Zone', icon: Building2, color: 'text-cyan-400' },
    { name: 'UPPPC', label: 'Pharma & MedTech Council', icon: Landmark, color: 'text-orange-400' },
    { name: 'Tenet Healthcare', label: 'Global Health Network', icon: Stethoscope, color: 'text-emerald-400' },
    { name: 'Shrinks Scientific', label: 'Behavioral & Health Analytics', icon: Microscope, color: 'text-purple-400' },
    { name: 'B Jain Publishers', label: 'Official Global Publisher', icon: BookOpenCheck, color: 'text-gold' },
  ];

  return (
    <section className="bg-obsidian-950 py-7 border-y border-gold/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase">
          Endorsed &amp; Referenced Across Global MedTech Authorities &amp; Publishers
        </span>
      </div>

      <div className="relative w-full overflow-hidden marquee-mask">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-6 pr-6">
          {/* Double list for infinite loop */}
          {[...partners, ...partners].map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-obsidian-850/80 border border-gold/25 shadow-lg hover:border-gold hover:shadow-gold-sm transition-all duration-300 group cursor-default"
              >
                <div className={`p-1.5 rounded-full bg-obsidian-700/60 ${p.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-100 tracking-wider font-sans group-hover:text-gold transition-colors">
                    {p.name}
                  </span>
                  <span className="text-[10px] text-slate-400 tracking-tight whitespace-nowrap">
                    {p.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
