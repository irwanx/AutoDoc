import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Github, Globe, Settings, Menu, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { SettingsDialog } from '../elements/SettingsDialog';

export const Navbar: React.FC = () => {
  const { t, language, changeLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-primary to-primary/60 rounded-lg">
                <Github className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800 text-lg">AutoDoc</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('home')}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                {t('home')}
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                {t('features')}
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                {t('howItWorks')}
              </button>
              <button
                onClick={() => scrollToSection('examples')}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                {t('examples')}
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <Select
                value={language}
                onValueChange={(value: 'id' | 'en') => changeLanguage(value)}
              >
                <SelectTrigger className="w-20 h-9 border-slate-200">
                  <SelectValue>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span className="text-xs">{language.toUpperCase()}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">🇮🇩 ID</SelectItem>
                  <SelectItem value="en">🇺🇸 EN</SelectItem>
                </SelectContent>
              </Select>

              {/* Settings Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
                className="hidden md:flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-left text-slate-600 hover:text-primary transition-colors py-2"
                >
                  {t('home')}
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-left text-slate-600 hover:text-primary transition-colors py-2"
                >
                  {t('features')}
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-left text-slate-600 hover:text-primary transition-colors py-2"
                >
                  {t('howItWorks')}
                </button>
                <button
                  onClick={() => scrollToSection('examples')}
                  className="text-left text-slate-600 hover:text-primary transition-colors py-2"
                >
                  {t('examples')}
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsSettingsOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 justify-start"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
};
