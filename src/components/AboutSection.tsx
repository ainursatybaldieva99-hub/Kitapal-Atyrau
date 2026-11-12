import React from 'react';
import { BookOpen, Heart, Sparkles, Compass } from 'lucide-react';
import { ATYRAU_STORE_ADDRESS } from '../utils/bookStoreLogic';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mission Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200/60">
              <Sparkles className="w-3.5 h-3.5 text-rose-700" />
              Біздің миссиямыз
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
              Сапалы әдебиетті қолжетімді етіп, оқу мәдениетін қалыптастыру
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              <strong>Kitapal Atyrau</strong> — бұл кітап сататын қарапайым дүкен ғана емес.
              Біз мұнайлы Атыраудың қақ ортасында, Жайық жағалауында ойлы, парасатты және кітапқұмар
              қауымның басын қосатын жылы мәдени кеңістік құруды мақсат еттік.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Біздің басты арманымыз — <em>«Қазақстанды кітап оқитын елге айналдыру»</em>.
              Өскелең ұрпақтың, жастар мен ересектердің кітап оқуға деген құштарлығын арттыру,
              ана тіліміздегі сапалы әдебиетті көбейту және әрбір отбасының төрінде кітап сөресінің
              болуына үлес қосу.
            </p>

            {/* 4 Pillars / Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-800 mb-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Сапалы мазмұн</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Тек мағыналы, пайдалы және көркемдік құны жоғары кітаптарды іріктеп ұсынамыз.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-800 mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Ана тіліне құрмет</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Қазақ тіліндегі сапалы аудармалар мен ұлттық классиканың насихатталуына басымдық береміз.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-800 mb-2">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Оқырман ортасы</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Кітап клубы, авторлық жүздесулер және әдеби талқылаулар арқылы орта қалыптастырамыз.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-800 mb-2">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Қолжетімді баға</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Баспалармен тікелей жұмыс жасап, адал баға мен тұрақты жеңілдіктерді қамтамасыз етеміз.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Story / Atmosphere Card */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/src/assets/images/kitapal_book_club_1794479420299.jpg"
                  alt="Kitapal Atyrau оқырмандары"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-xs font-semibold">Атыраулық кітапқұмарлардың басын қосқан орта</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-editorial text-xl font-bold text-stone-900">
                  Атырау қаласындағы жылы әдеби үйіңіз
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Дүкенімізге келіп, хош иісті шай немесе кофе үстінде кітап парақтауға, сүйікті
                  авторыңыздың жаңа туындысымен танысуға немесе жай ғана тыныш ортада ой жинақтауға
                  әрдайым есігіміз ашық.
                </p>

                <div className="pt-2 text-xs font-medium text-rose-800">
                  📍 {ATYRAU_STORE_ADDRESS}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
