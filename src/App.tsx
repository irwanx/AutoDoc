import { useState } from 'react';
import { Navbar } from '@/components/layouts/Navbar';
import { Hero } from '@/components/section/Hero';
import { FeaturesSection } from '@/components/section/FeaturesSection';
import { HowItWorksSection } from '@/components/section/HowItWorksSection';
import { ExamplesSection } from '@/components/section/ExamplesSection';
import { GeneratorForm } from '@/components/section/GeneratorForm';
import { PreviewSection } from '@/components/section/PreviewSection';
import { Footer } from '@/components/layouts/Footer';
import { ReadmeGenerator } from '@/services/readmeGenerator';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';

function App() {
  const { t } = useTranslation();
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'AutoDoc – README Generator';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Generate beautiful, AI-enhanced README.md files in seconds using GitHub repo links.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content =
        'Generate beautiful, AI-enhanced README.md files in seconds using GitHub repo links.';
      document.head.appendChild(meta);
    }
  }, []);

  const handleGenerate = async (url: string) => {
    setIsGenerating(true);
    setRepositoryUrl(url);

    try {
      const readme = await ReadmeGenerator.generateReadme(url, {
        includeInstallation: true,
        includeUsage: true,
        includeContributing: true,
        includeLicense: true,
        includeBadges: true,
        includeScreenshots: false,
        language: 'id',
      });

      setGeneratedReadme(readme);
      toast({
        title: t('generationSuccess'),
        description: t('generationSuccessDesc'),
      });
    } catch (error) {
      console.error('Generation failed:', error);
      toast({
        title: t('generationFailed'),
        description:
          error instanceof Error
            ? error.message
            : 'Please check the repository URL and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTryExample = (url: string) => {
    handleGenerate(url);
    // Scroll to form
    const formElement = document.getElementById('generator-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Hero />
          <div id="generator-form">
            <GeneratorForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
          {(generatedReadme || isGenerating) && (
            <PreviewSection
              content={generatedReadme}
              isLoading={isGenerating}
              repositoryUrl={repositoryUrl}
            />
          )}
        </div>
        <FeaturesSection />
        <HowItWorksSection />
        <ExamplesSection onTryExample={handleTryExample} />
        <Footer />
      </div>
      <Toaster />
    </>
  );
}

export default App;
