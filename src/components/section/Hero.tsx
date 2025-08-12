import React from 'react';
import { Github, Sparkles, Zap } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div id="home" className="text-center mb-16 pt-24 overflow-hidden">
      <div>
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-primary/60 rounded-2xl mb-8 shadow-lg transform transition-all hover:rotate-12 hover:scale-105">
          <Github className="w-10 h-10 text-white" />
        </div>

        <center>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight max-w-4xl">
            {t('heroTitle')}{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              README.md
            </span>{' '}
            {t('heroSubtitle')}{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent underline underline-offset-4 decoration-primary/60">
              AutoDoc
            </span>
          </h1>
        </center>

        <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto font-medium">
          {t('heroDescription')}
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
          <div className="relative">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <div className="absolute -inset-1 border border-amber-500/20 rounded-full"></div>
          </div>
          <span className="italic">{t('heroTagline')}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-slate-200">
            <div className="p-1 bg-green-100 rounded-full">
              <Zap className="w-4 h-4 text-green-500" />
            </div>
            <span>{t('instantGeneration')}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-slate-200">
            <div className="p-1 bg-blue-100 rounded-full">
              <Github className="w-4 h-4 text-blue-500" />
            </div>
            <span>{t('githubIntegration')}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-slate-200">
            <div className="p-1 bg-purple-100 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <span>{t('aiPowered')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
