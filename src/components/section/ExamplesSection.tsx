import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ExamplesSectionProps {
  onTryExample: (url: string) => void;
}

export const ExamplesSection: React.FC<ExamplesSectionProps> = ({
  onTryExample,
}) => {
  const { t } = useTranslation();

  const examples = [
    {
      name: 'Next.js',
      url: 'https://github.com/vercel/next.js',
      description: 'The React Framework for Production',
      language: 'TypeScript',
      stars: '125k',
      forks: '26.8k',
      color: 'bg-black',
    },
    {
      name: 'React',
      url: 'https://github.com/facebook/react',
      description: 'The library for web and native user interfaces',
      language: 'JavaScript',
      stars: '228k',
      forks: '46.7k',
      color: 'bg-blue-500',
    },
    {
      name: 'Tailwind CSS',
      url: 'https://github.com/tailwindlabs/tailwindcss',
      description: 'A utility-first CSS framework',
      language: 'JavaScript',
      stars: '82.4k',
      forks: '4.2k',
      color: 'bg-cyan-500',
    },
    {
      name: 'VS Code',
      url: 'https://github.com/microsoft/vscode',
      description: 'Visual Studio Code',
      language: 'TypeScript',
      stars: '163k',
      forks: '28.9k',
      color: 'bg-blue-600',
    },
    {
      name: 'Node.js',
      url: 'https://github.com/nodejs/node',
      description: 'Node.js JavaScript runtime',
      language: 'JavaScript',
      stars: '107k',
      forks: '29.3k',
      color: 'bg-green-600',
    },
    {
      name: 'Vue.js',
      url: 'https://github.com/vuejs/vue',
      description: 'The Progressive JavaScript Framework',
      language: 'TypeScript',
      stars: '207k',
      forks: '33.7k',
      color: 'bg-green-500',
    },
  ];

  return (
    <section id="examples" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('examplesTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Coba generator dengan repositori populer ini untuk melihat hasilnya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 group"
            >
              <center>
                <div className="mb-4">
                  <div
                    className={`w-10 h-10 ${example.color} rounded-lg flex items-center justify-center`}
                  >
                    <Github className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {example.name}
                </h3>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {example.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span>{example.language}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{example.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    <span>{example.forks}</span>
                  </div>
                </div>
              </center>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(example.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                <a href={example.url}>{example.url}</a>
              </Button>

              <Button
                onClick={() => onTryExample(example.url)}
                className="w-full bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary"
                size="sm"
              >
                {t('tryExample')}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
