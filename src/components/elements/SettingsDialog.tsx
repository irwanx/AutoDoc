import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Github, Trash2 } from 'lucide-react';
import { LocalStorage } from '@/utils/localStorage';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    if (open) {
      const savedToken = LocalStorage.getGitHubToken();
      setToken(savedToken || '');
    }
  }, [open]);

  const handleSaveToken = () => {
    if (token.trim()) {
      LocalStorage.setGitHubToken(token.trim());
      toast({
        title: t('toastTokenSavedTitle'),
        description: t('toastTokenSavedDesc'),
      });
    } else {
      LocalStorage.removeGitHubToken();
      toast({
        title: t('toastTokenRemovedTitle'),
        description: t('toastTokenRemovedDesc'),
      });
    }
    onOpenChange(false);
  };

  const handleRemoveToken = () => {
    LocalStorage.removeGitHubToken();
    setToken('');
    toast({
      title: t('toastTokenRemovedTitle'),
      description: t('toastTokenRemovedDesc'),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            {t('settingsTitle')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="github-token">{t('githubToken')}</Label>
            <div className="relative">
              <Input
                id="github-token"
                type={showToken ? 'text' : 'password'}
                placeholder={t('githubTokenPlaceholder')}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowToken(!showToken)}
                  className="h-7 w-7 p-0"
                >
                  {showToken ? (
                    <EyeOff className="w-3 h-3" />
                  ) : (
                    <Eye className="w-3 h-3" />
                  )}
                </Button>
                {token && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveToken}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {t('githubTokenHelp')}. {t('tokenStoredInBrowser')}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">
              {t('howToGetToken')}
            </h4>
            <ol className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>{t('getTokenStep1')}</li>
              <li>{t('getTokenStep2')}</li>
              <li>{t('getTokenStep3')}</li>
              <li>{t('getTokenStep4')}</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSaveToken} className="flex-1">
              {t('saveToken')}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t('close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
