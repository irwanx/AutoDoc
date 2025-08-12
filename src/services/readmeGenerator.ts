import axios from 'axios';
import { GitHubService } from './githubApi';
import type { GitHubRepo, GitHubContent } from './githubApi';
import { LocalStorage } from '@/utils/localStorage';

export interface GenerationOptions {
  includeInstallation: boolean;
  includeUsage: boolean;
  includeContributing: boolean;
  includeLicense: boolean;
  includeBadges: boolean;
  includeScreenshots: boolean;
  language: 'id' | 'en';
}

type ProjectStructure = Awaited<
  ReturnType<typeof ReadmeGenerator['analyzeProjectStructure']>
>;

export class ReadmeGenerator {
  private static readonly languageColors: Record<string, string> = {
    JavaScript: 'f1e05a',
    TypeScript: '3178c6',
    Python: '3776ab',
    Java: 'ed8b00',
    'C++': '00599c',
    'C#': '239120',
    PHP: '777bb4',
    Ruby: 'cc342d',
    Go: '00add8',
    Rust: 'dea584',
    Swift: 'fa7343',
    Kotlin: '7f52ff',
    Dart: '0175c2',
    HTML: 'e34c26',
    CSS: '1572b6',
    Shell: '89e051',
    Vue: '4fc08d',
  };

  private static async callLuminaiAPI(
    content: string,
    prompt: string
  ): Promise<string> {
    try {
      const response = await axios.post(
        'https://luminai.my.id',
        {
          content,
          user: 'readme-generator',
          prompt,
        },
        {
          timeout: 10000,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36',
          },
        }
      );
      return (
        response.data.result ||
        response.data.response ||
        response.data ||
        content
      );
    } catch (error) {
      console.warn('Luminai API failed, using fallback:', error);
      return content;
    }
  }

  private static generateBadges(repo: GitHubRepo): string {
    const badges: string[] = [];
    const languageName = repo.language || '';
    const encodedLanguage = encodeURIComponent(languageName);

    if (languageName) {
      const color = this.languageColors[languageName] || '000000';
      const logo = languageName
        .toLowerCase()
        .replace(/\+/g, 'plus')
        .replace(/#/g, 'sharp');
      badges.push(
        `![${languageName}](https://img.shields.io/badge/${encodedLanguage}-${color}?style=for-the-badge&logo=${logo}&logoColor=white)`
      );
    }

    if (repo.license) {
      badges.push(
        `![License](https://img.shields.io/github/license/${repo.full_name}?style=for-the-badge)`
      );
    }

    badges.push(
      `![Stars](https://img.shields.io/github/stars/${repo.full_name}?style=for-the-badge)`
    );
    badges.push(
      `![Forks](https://img.shields.io/github/forks/${repo.full_name}?style=for-the-badge)`
    );
    badges.push(
      `![Issues](https://img.shields.io/github/issues/${repo.full_name}?style=for-the-badge)`
    );

    return badges.join(' ');
  }

  private static async analyzeProjectStructure(owner: string, repo: string) {
    try {
      const contents = await GitHubService.getRepositoryContents(owner, repo);
      const fileNames = contents.map((item) => item.name.toLowerCase());

      return {
        hasTests: fileNames.some(
          (name) =>
            name.includes('test') ||
            name.includes('spec') ||
            name === '__tests__'
        ),
        hasDocker:
          fileNames.includes('dockerfile') ||
          fileNames.includes('docker-compose.yml'),
        hasCI:
          fileNames.includes('.github') ||
          fileNames.includes('.gitlab-ci.yml') ||
          fileNames.includes('.travis.yml'),
        packageManager: this.detectPackageManager(fileNames),
        framework: this.detectFramework(fileNames, contents),
        hasEnvExample: fileNames.includes('.env.example'),
      };
    } catch {
      return {
        hasTests: false,
        hasDocker: false,
        hasCI: false,
        packageManager: 'unknown',
        framework: 'unknown',
        hasEnvExample: false,
      };
    }
  }

  private static detectPackageManager(fileNames: string[]): string {
    if (fileNames.includes('yarn.lock')) return 'yarn';
    if (fileNames.includes('pnpm-lock.yaml')) return 'pnpm';
    if (
      fileNames.includes('package-lock.json') ||
      fileNames.includes('package.json')
    )
      return 'npm';
    if (fileNames.includes('requirements.txt')) return 'pip';
    if (fileNames.includes('composer.json')) return 'composer';
    if (fileNames.includes('cargo.toml')) return 'cargo';
    if (fileNames.includes('go.mod')) return 'go mod';
    return 'unknown';
  }

  private static detectFramework(
    fileNames: string[],
    contents: GitHubContent[]
  ): string {
    if (fileNames.includes('next.config.js')) return 'Next.js';
    if (fileNames.includes('nuxt.config.js')) return 'Nuxt.js';
    if (fileNames.includes('vue.config.js')) return 'Vue.js';
    if (fileNames.includes('angular.json')) return 'Angular';
    if (fileNames.includes('svelte.config.js')) return 'Svelte';
    if (fileNames.includes('astro.config.mjs')) return 'Astro';
    if (contents.some((c) => c.name.toLowerCase().startsWith('vite.config.')))
      return 'Vite';
    return 'unknown';
  }

  private static getRunCommand(packageManager: string, script: string): string {
    const commands: Record<string, string> = {
      npm: `npm run ${script}`,
      yarn: `yarn ${script}`,
      pnpm: `pnpm ${script}`,
    };
    return commands[packageManager] || `npm run ${script}`;
  }

  private static async generateInstallationInstructions(
    repo: GitHubRepo,
    structure: ProjectStructure,
    language: 'id' | 'en'
  ): Promise<string> {
    const installCommands: string[] = [];
    installCommands.push(`git clone ${repo.clone_url}`);
    installCommands.push(`cd ${repo.name}`);

    const depCommands: Record<string, string> = {
      yarn: 'yarn install',
      pnpm: 'pnpm install',
      npm: 'npm install',
      pip: 'pip install -r requirements.txt',
      composer: 'composer install',
      cargo: 'cargo build --release',
    };

    if (structure.packageManager && depCommands[structure.packageManager]) {
      installCommands.push(depCommands[structure.packageManager]);
    }

    if (structure.hasEnvExample) {
      installCommands.push('cp .env.example .env');
      const configureText =
        language === 'id'
          ? '# Konfigurasi variabel di .env'
          : '# Configure your variables in .env';
      installCommands.push(configureText);
    }

    const commandsText = installCommands.join('\n');
    const prompt =
      language === 'id'
        ? `Buatkan bagian instalasi yang jelas untuk README (bahasa Indonesia) dari perintah berikut: ${commandsText}. Jelaskan tiap langkahnya.`
        : `Create a clear installation section for a README from these commands: ${commandsText}. Explain each step.`;

    const aiEnhanced = await this.callLuminaiAPI(commandsText, prompt);
    const title = language === 'id' ? '## 🚀 Instalasi' : '## 🚀 Installation';

    return `${title}\n\n\`\`\`bash\n${aiEnhanced || commandsText}\n\`\`\``;
  }

  private static async generateUsageSection(
    structure: ProjectStructure,
    packageContent: string,
    language: 'id' | 'en'
  ): Promise<string> {
    const usageCommands: string[] = [];
    let scripts: Record<string, string> = {};

    try {
      if (packageContent) {
        scripts = JSON.parse(packageContent).scripts || {};
      }
    } catch (_e) {
      if (import.meta.env.DEV) {
        console.error(_e);
      }
      console.warn('Could not parse package.json');
    }

    const commonScripts = ['dev', 'start', 'build', 'test'];
    for (const script of commonScripts) {
      if (scripts[script]) {
        usageCommands.push(
          this.getRunCommand(structure.packageManager, script)
        );
      }
    }

    if (usageCommands.length === 0) return '';

    const commandsText = usageCommands.join('\n');
    const prompt =
      language === 'id'
        ? `Buatkan bagian penggunaan (Usage) untuk proyek ini dari perintah berikut: ${commandsText}. Jelaskan fungsi tiap perintah.`
        : `Create a Usage section for this project from the following commands: ${commandsText}. Explain what each command does.`;

    const aiEnhanced = await this.callLuminaiAPI(commandsText, prompt);
    const title = language === 'id' ? '## 💻 Penggunaan' : '## 💻 Usage';

    return `${title}\n\n\`\`\`bash\n${aiEnhanced || commandsText}\n\`\`\``;
  }

  private static generateFeaturesList(
    repo: GitHubRepo,
    structure: ProjectStructure,
    languages: Record<string, number>,
    language: 'id' | 'en'
  ): string[] {
    const features: string[] = [];
    if (structure.framework !== 'unknown') {
      features.push(
        language === 'id'
          ? `Dibangun dengan **${structure.framework}**`
          : `Built with **${structure.framework}**`
      );
    }
    if (repo.language) {
      features.push(
        language === 'id'
          ? `Dibuat dengan **${repo.language}**`
          : `Crafted in **${repo.language}**`
      );
    }
    if (Object.keys(languages).length > 1) {
      features.push(
        language === 'id' ? 'Proyek Multi-bahasa' : 'Multi-language Project'
      );
    }
    if (structure.hasTests) {
      features.push(
        language === 'id' ? 'Pengujian Terintegrasi' : 'Integrated Testing'
      );
    }
    if (structure.hasCI) {
      features.push('Continuous Integration (CI/CD)');
    }
    if (structure.hasDocker) {
      features.push(language === 'id' ? 'Dukungan Docker' : 'Docker Support');
    }
    return features;
  }

  static async generateReadme(
    repositoryUrl: string,
    options: GenerationOptions
  ): Promise<string> {
    const language = options.language || LocalStorage.getLanguage() || 'id';
    const parsed = GitHubService.parseGitHubUrl(repositoryUrl);
    if (!parsed) {
      throw new Error(
        language === 'id' ? 'URL GitHub tidak valid' : 'Invalid GitHub URL'
      );
    }

    const { owner, repo: repoName } = parsed;

    try {
      const [repoInfo, languages, structure] = await Promise.all([
        GitHubService.getRepositoryInfo(owner, repoName),
        GitHubService.getLanguages(owner, repoName),
        this.analyzeProjectStructure(owner, repoName),
      ]);

      const packageContent =
        structure.packageManager === 'npm' ||
        structure.packageManager === 'yarn' ||
        structure.packageManager === 'pnpm'
          ? await GitHubService.getFileContent(owner, repoName, 'package.json')
          : '';

      const sections: string[] = [];

      const badges = options.includeBadges ? this.generateBadges(repoInfo) : '';
      sections.push(`# ${repoInfo.name}\n\n${badges}`);

      const descriptionPrompt =
        language === 'id'
          ? `Tulis ulang deskripsi proyek ini agar menarik: "${
              repoInfo.description || repoInfo.name
            }".`
          : `Rewrite this project description to be more engaging: "${
              repoInfo.description || repoInfo.name
            }".`;
      const enhancedDescription = await this.callLuminaiAPI(
        repoInfo.description || repoInfo.name,
        descriptionPrompt
      );
      sections.push(`## 📖 Deskripsi\n\n${enhancedDescription}`);

      const featuresList = this.generateFeaturesList(
        repoInfo,
        structure,
        languages,
        language
      );
      if (featuresList.length > 0) {
        const featuresText = featuresList.map((f) => `- ${f}`).join('\n');
        sections.push(`## ✨ Fitur\n\n${featuresText}`);
      }

      if (options.includeInstallation) {
        const installationSection = await this.generateInstallationInstructions(
          repoInfo,
          structure,
          language
        );
        sections.push(installationSection);
      }

      if (options.includeUsage && packageContent) {
        const usageSection = await this.generateUsageSection(
          structure,
          packageContent,
          language
        );
        sections.push(usageSection);
      }

      if (options.includeContributing) {
        const title =
          language === 'id' ? '## 🤝 Kontribusi' : '## 🤝 Contributing';
        const text =
          language === 'id'
            ? 'Kontribusi sangat kami harapkan! Silakan buat Pull Request.'
            : 'Contributions are welcome! Please feel free to submit a Pull Request.';
        sections.push(`${title}\n\n${text}`);
      }

      if (options.includeLicense && repoInfo.license) {
        const title = language === 'id' ? '## 📄 Lisensi' : '## 📄 License';
        const text = `This project is licensed under the ${repoInfo.license.name} License.`;
        sections.push(`${title}\n\n${text}`);
      }

      return sections.join('\n\n');
    } catch (error) {
      console.error('Error generating README:', error);
      throw new Error(
        language === 'id'
          ? 'Gagal membuat README.'
          : 'Failed to generate README.'
      );
    }
  }
}