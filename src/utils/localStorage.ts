export const LocalStorage = {
  getGitHubToken(): string | null {
    return localStorage.getItem('github_token');
  },

  setGitHubToken(token: string): void {
    localStorage.setItem('github_token', token);
  },

  removeGitHubToken(): void {
    localStorage.removeItem('github_token');
  },

  getLanguage(): 'id' | 'en' {
    return (localStorage.getItem('language') as 'id' | 'en') || 'id';
  },

  setLanguage(language: 'id' | 'en'): void {
    localStorage.setItem('language', language);
  },

  getTheme(): 'light' | 'dark' {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  },

  setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem('theme', theme);
  },
};
