import React from 'react';
import { ArrowRight, BookOpen, Sparkles, MapPin, Coffee, Users } from 'lucide-react';
import { ATYRAU_STORE_ADDRESS } from '../utils/bookStoreLogic';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onJoinClub: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCatalog, onJoinClub }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-white border-b border-stone-200">
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Brand badge & Location tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 font-semibold border border-rose-200/60">
                <BookOpen className="w-3.5 h-3.5 text-rose-700" />
                Kitapal Atyrau
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {ATYRAU_STORE_ADDRESS}
              </span>
            </div>

            {/* Slogan */}
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-[1.15] tracking-tight">
              «Қазақстанды кітап оқитын елге айналдырайық!»
            </h1>

            {/* Brief intro about Kitapal Atyrau */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Kitapal Atyrau — бұл жай ғана интернет-дүкен емес, білім мен мәдениетті ту еткен,
              ізденімпаз жандардың рухани ортасы. Мұнда ұлттық қазақ әдебиетінің інжу-маржандары,
              әлемдік бестселлерлер, балаларға арналған ғажайып кітаптар мен тұлғалық даму
              еңбектері жинақталған.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="py-3 px-6 bg-rose-800 hover:bg-rose-900 text-white font-semibold text-sm rounded-xl shadow-lg shadow-rose-950/10 transition-all flex items-center gap-2 group"
              >
                <span>Кітаптарды көру</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onJoinClub}
                className="py-3 px-6 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-sm rounded-xl transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-stone-600" />
                <span>Кітап клубына жазылу</span>
              </button>
            </div>

            {/* Trust Quote / Stats */}
            <div className="pt-4 border-t border-stone-100 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  1 200+
                </p>
                <p className="text-[11px] text-stone-500 font-medium">Таңдаулы кітаптар</p>
              </div>
              <div>
                <p className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  240+
                </p>
                <p className="text-[11px] text-stone-500 font-medium">Клуб қатысушысы</p>
              </div>
              <div>
                <p className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  3 500+
                </p>
                <p className="text-[11px] text-stone-500 font-medium">Ауылдарға сыйланған</p>
              </div>
            </div>
          </div>

          {/* Media Column: Beautiful Bookstore Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
                <img
                  src="/src/assets/images/kitapal_hero_store_1794479420734.jpg"
                  alt="Kitapal Atyrau кітап дүкенінің ішкі көрінісі"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-rose-300" />
                    Kitapal Atyrau — Оқуға, дамуға және кездесуге арналған жайлы орын
                  </p>
                  <p className="text-[11px] text-stone-300">
                    {ATYRAU_STORE_ADDRESS}
                  </p>
                </div>
              </div>

              {/* Floating aesthetic feature card */}
              <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 shadow-xl max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md bg-rose-100 flex items-center justify-center text-rose-800">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-stone-900">Атырау бойынша</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Тапсырыс күні немесе ертеңіне есікке дейін жеткізу
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
