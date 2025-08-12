import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200">
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="text-center">
          <div className="mt-6 pt-6 border-t border-slate-200 text-xs text-slate-400">
            <p>{t('copyright')}</p>
            <p className="flex items-center justify-center gap-1 mt-2">
              <span>{t('madeWith')}</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>{t('forDevelopers')}</span>
              <a
                href="https://github.com/irwanx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/70 hover:underline font-medium inline-flex items-center gap-1 ml-1"
              >
                irwanx
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
