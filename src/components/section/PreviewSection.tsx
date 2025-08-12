import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Copy, Eye, Code, Loader2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

interface PreviewSectionProps {
  content: string;
  isLoading: boolean;
  repositoryUrl: string;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  content,
  isLoading,
  repositoryUrl,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: t('copied'),
        description: 'Konten README telah disalin ke clipboard Anda.',
      });
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Copy failed:', err);
      }
      toast({
        title: 'Gagal menyalin',
        description: 'Silakan coba lagi atau salin teks secara manual.',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: t('downloadStarted'),
      description: 'File README.md Anda sedang diunduh.',
    });
  };

  const renderMarkdownPreview = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];

      // Handle code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true;
          codeBlockLanguage = line.substring(3).trim();
          codeBlockContent = [];
        } else {
          // End of code block
          inCodeBlock = false;
          elements.push(
            <div key={`code-${index}`} className="my-4">
              <div className="bg-slate-800 text-slate-200 px-4 py-2 text-xs font-medium rounded-t-lg border-b border-slate-600">
                {codeBlockLanguage || 'code'}
              </div>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-b-lg overflow-x-auto text-sm font-mono leading-relaxed">
                <code>{codeBlockContent.join('\n')}</code>
              </pre>
            </div>
          );
          codeBlockContent = [];
          codeBlockLanguage = '';
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1
            key={index}
            className="text-3xl font-bold text-slate-900 mb-4 mt-6 first:mt-0"
          >
            {line.substring(2)}
          </h1>
        );
        continue;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={index}
            className="text-2xl font-semibold text-slate-800 mb-3 mt-6"
          >
            {line.substring(3)}
          </h2>
        );
        continue;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={index}
            className="text-xl font-semibold text-slate-700 mb-2 mt-4"
          >
            {line.substring(4)}
          </h3>
        );
        continue;
      }

      // Badges (images)
      if (line.includes('![') && line.includes('](')) {
        const badgeMatches = line.match(/!\[([^\]]*)\]\(([^)]*)\)/g);
        if (badgeMatches) {
          elements.push(
            <div key={index} className="flex flex-wrap gap-2 mb-4">
              {badgeMatches.map((badge, badgeIndex) => {
                const match = badge.match(/!\[([^\]]*)\]\(([^)]*)\)/);
                if (match) {
                  return (
                    <img
                      key={badgeIndex}
                      src={match[2]}
                      alt={match[1]}
                      className="h-6 rounded"
                    />
                  );
                }
                return null;
              })}
            </div>
          );
          continue;
        }
      }

      // Lists
      if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="text-slate-700 mb-1 ml-4 list-disc">
            {line.substring(2)}
          </li>
        );
        continue;
      }
      if (/^\d+\. /.test(line)) {
        elements.push(
          <li key={index} className="text-slate-700 mb-1 ml-4 list-decimal">
            {line.replace(/^\d+\. /, '')}
          </li>
        );
        continue;
      }

      // Links
      if (line.includes('[') && line.includes('](')) {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = line.split(linkRegex);
        elements.push(
          <p key={index} className="text-slate-700 mb-2">
            {parts.map((part, partIndex) => {
              if (partIndex % 3 === 1) {
                const url = parts[partIndex + 1];
                return (
                  <a
                    key={partIndex}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                  >
                    {part}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                );
              }
              if (partIndex % 3 === 0) {
                return <span key={partIndex}>{part}</span>;
              }
              return null;
            })}
          </p>
        );
        continue;
      }

      // Inline code
      if (line.includes('`') && !line.startsWith('```')) {
        const codeRegex = /`([^`]+)`/g;
        const parts = line.split(codeRegex);
        return (
          <p key={index} className="text-slate-700 mb-2">
            {parts.map((part, partIndex) =>
              partIndex % 2 === 1 ? (
                <code
                  key={partIndex}
                  className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono text-red-600"
                >
                  {part}
                </code>
              ) : (
                <span key={partIndex}>{part}</span>
              )
            )}
          </p>
        );
        continue;
      }

      // Empty lines
      if (line.trim() === '') {
        elements.push(<br key={index} />);
        continue;
      }

      // Regular paragraphs
      elements.push(
        <p key={index} className="text-slate-700 mb-2">
          {line}
        </p>
      );
    }

    return elements;
  };

  if (isLoading) {
    return (
      <Card className="p-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Sedang Generate README Anda
          </h3>
          <p className="text-slate-600">{t('analyzing')}</p>
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {t('generatedReadme')}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Untuk:{' '}
              <span className="font-mono text-blue-600">{repositoryUrl}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {t('copy')}
            </Button>
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Download className="w-4 h-4" />
              {t('download')}
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mx-6 mt-6">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            {t('preview')}
          </TabsTrigger>
          <TabsTrigger value="markdown" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            {t('markdown')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="p-6 pt-4">
          <div className="prose prose-slate max-w-none">
            <div className="markdown-preview bg-white rounded-lg p-6 border border-slate-200">
              {renderMarkdownPreview(content)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="markdown" className="p-6 pt-4">
          <pre className="bg-slate-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
            {content}
          </pre>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
