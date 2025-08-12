export interface Language {
  code: 'id' | 'en';
  name: string;
  flag: string;
}

export interface GenerationOptions {
  includeInstallation: boolean;
  includeUsage: boolean;
  includeContributing: boolean;
  includeLicense: boolean;
  includeBadges: boolean;
  includeScreenshots: boolean;
  language: 'id' | 'en';
}

export interface GitHubSettings {
  token?: string;
  usePrivateRepos: boolean;
}
