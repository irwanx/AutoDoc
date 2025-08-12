import React from 'react';
import { Card } from '@/components/ui/card';
import { Link, Search, Wand2, Download } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Link,
      title: t('step1Title'),
      description: t('step1Desc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Search,
      title: t('step2Title'),
      description: t('step2Desc'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Wand2,
      title: t('step3Title'),
      description: t('step3Desc'),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Download,
      title: t('step4Title'),
      description: t('step4Desc'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('howItWorksTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Proses sederhana dalam 4 langkah untuk menghasilkan README yang
            profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${step.bgColor} rounded-2xl mb-4 mx-auto`}
                >
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
