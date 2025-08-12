import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Github, Loader2, ArrowRight, Key } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { LocalStorage } from '@/utils/localStorage';

interface GeneratorFormProps {
  onGenerate: (url: string) => void;
  isGenerating: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  onGenerate,
  isGenerating,
}) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [token, setToken] = useState(LocalStorage.getGitHubToken() || '');
  const [error, setError] = useState('');

  const validateGithubUrl = (url: string): boolean => {
    const githubPattern =
      /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/;
    return githubPattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    if (!validateGithubUrl(url)) {
      setError(
        'Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo)'
      );
      return;
    }

    setError('');

    // Save token if provided
    if (token.trim()) {
      LocalStorage.setGitHubToken(token.trim());
    }

    onGenerate(url);
  };

  return (
    <div className="mb-12">
      <Card className="p-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="github-url">{t('githubUrl')}</Label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="github-url"
                type="url"
                placeholder={t('githubUrlPlaceholder')}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-12 h-12 text-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                disabled={isGenerating}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="github-token">{t('githubToken')}</Label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="github-token"
                type="password"
                placeholder={t('githubTokenPlaceholder')}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="pl-12 h-12 text-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                disabled={isGenerating}
              />
            </div>
            <p className="text-xs text-slate-500">{t('githubTokenHelp')}</p>
          </div>

          <div>
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span>⚠️</span>
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isGenerating || !url.trim()}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t('generating')}
              </>
            ) : (
              <>
                {t('generateReadme')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-600 text-center">
            <span className="font-medium">{t('examples')}:</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {[
              'https://github.com/vercel/next.js',
              'https://github.com/facebook/react',
              'https://github.com/tailwindlabs/tailwindcss',
              'https://github.com/microsoft/vscode',
              'https://github.com/nodejs/node',
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setUrl(example)}
                className="text-xs text-primary hover:underline bg-primary/10 px-2 py-1 rounded transition-colors"
                disabled={isGenerating}
              >
                {example.replace('https://github.com/', '')}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
