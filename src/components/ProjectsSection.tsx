import React, { useState } from 'react';
import { STORE_PROJECTS } from '../data/projectsData';
import { ProjectItem } from '../types/book';
import { ATYRAU_STORE_PHONE } from '../utils/bookStoreLogic';
import { Users, BookOpen, Send, X, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [participantName, setParticipantName] = useState('');
  const [participantPhone, setParticipantPhone] = useState('');
  const [participantNote, setParticipantNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleJoinProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const messageLines = [
      `Сәлеметсіз бе, Kitapal Atyrau!`,
      `Мен «${selectedProject.title}» жобасына қатысқым келеді.`,
      ``,
      `👤 Аты-жөнім: ${participantName}`,
      `📱 Байланыс телефоным: ${participantPhone}`,
      participantNote ? `💬 Қосымша: ${participantNote}` : '',
      ``,
      `Жобаның келесі қадамдары мен қатысу шарттарын білуге болады ма? Рақмет!`,
    ].filter(Boolean);

    const url = `https://wa.me/${ATYRAU_STORE_PHONE}?text=${encodeURIComponent(messageLines.join('\n'))}`;
    window.open(url, '_blank');

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedProject(null);
      setParticipantName('');
      setParticipantPhone('');
      setParticipantNote('');
    }, 2000);
  };

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200/60 mb-2">
            <Users className="w-3.5 h-3.5 text-rose-700" />
            Әлеуметтік & Мәдени бастамалар
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mb-2">
            Біздің жобаларымыз
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Оқу мәдениетін бірге дамытайық: ауылдарға кітап сыйлау, апта сайынғы кітап клубы және
            белгілі қаламгерлермен жүздесулер
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {STORE_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-lg hover:border-rose-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[16/9] overflow-hidden group">
                  <img
                    src={project.imageUrl || '/src/assets/images/kitapal_hero_store_1794479420734.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-stone-900 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
                    {project.statusText}
                  </div>
                  {project.stats && (
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium">
                      {project.stats}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-rose-800 mb-2">{project.tagline}</p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>{project.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-800 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Participation Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Жабу"
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-editorial text-xl font-bold text-stone-900">
                  Өтінішіңіз WhatsApp-қа жолданды!
                </h3>
                <p className="text-xs text-stone-500">
                  Менеджер сізге жақын арада жауап береді. Рақмет!
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-rose-800 text-xs font-semibold mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Kitapal Бастамасы</span>
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4 whitespace-pre-line">
                  {selectedProject.fullStory}
                </p>

                {selectedProject.stats && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-900 font-semibold mb-5">
                    📊 Нәтиже: {selectedProject.stats}
                  </div>
                )}

                <form onSubmit={handleJoinProject} className="space-y-3 pt-2 border-t border-stone-100">
                  <p className="text-xs font-bold text-stone-900">
                    Қатысу немесе үлес қосу үшін деректеріңізді қалдырыңыз:
                  </p>

                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">Аты-жөніңіз</label>
                    <input
                      type="text"
                      required
                      placeholder="Мысалы: Данияр"
                      value={participantName}
                      onChange={(e) => setParticipantName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">
                      Телефон нөмірі (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (707) 000-00-00"
                      value={participantPhone}
                      onChange={(e) => setParticipantPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">
                      Тілегіңіз немесе сұрағыңыз (қосымша)
                    </label>
                    <input
                      type="text"
                      placeholder="Мысалы: 5 кітап сыйға тартқым келеді"
                      value={participantNote}
                      onChange={(e) => setParticipantNote(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    WhatsApp арқылы өтініш жіберу
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
