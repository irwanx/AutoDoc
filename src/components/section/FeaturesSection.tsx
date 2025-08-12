import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Zap, Award, Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t('feature1Title'),
      description: t('feature1Desc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Zap,
      title: t('feature2Title'),
      description: t('feature2Desc'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Award,
      title: t('feature3Title'),
      description: t('feature3Desc'),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Globe,
      title: t('feature4Title'),
      description: t('feature4Desc'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('featuresTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Fitur-fitur canggih yang membuat generator README ini berbeda dari
            yang lain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-slate-50"
            >
              <center>
                <div className="flex justify-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-xl mb-4`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </center>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
