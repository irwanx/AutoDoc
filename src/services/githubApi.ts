import axios from 'axios';
import { LocalStorage } from '@/utils/localStorage';

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  language: string;
  languages_url: string;
  topics: string[];
  license: { name: string } | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  homepage: string;
  clone_url: string;
  html_url: string;
  private: boolean; // <-- Tambahan
}

export interface GitHubContent {
  name: string;
  path: string;
  type: 'file' | 'dir';
  content?: string;
  download_url: string | null;
}

export class GitHubService {
  private static async fetchWithRetry<T>(url: string, retries = 3): Promise<T> {
    const token = LocalStorage.getGitHubToken();
    const headers: Record<string, string> = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36',
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get(url, {
          timeout: 10000,
          headers,
        });
        return response.data as T;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          throw new Error('Repository tidak ditemukan atau mungkin privat.');
        }
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          throw new Error('Rate limit terlampaui atau akses ditolak.');
        }
        if (i === retries - 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    throw new Error('Fetch gagal setelah semua percobaan ulang.');
  }

  static async getRepositoryInfo(
    owner: string,
    repo: string
  ): Promise<GitHubRepo> {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    return this.fetchWithRetry<GitHubRepo>(url);
  }

  static async getRepositoryContents(
    owner: string,
    repo: string,
    path = ''
  ): Promise<GitHubContent[]> {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const result = await this.fetchWithRetry<GitHubContent | GitHubContent[]>(
      url
    );
    return Array.isArray(result) ? result : [result];
  }

  static async getFileContent(
    owner: string,
    repo: string,
    path: string
  ): Promise<string> {
    try {
      const contents = await this.getRepositoryContents(owner, repo, path);
      const file = contents[0];
      if (file && file.type === 'file' && file.download_url) {
        const response = await axios.get(file.download_url);
        return response.data;
      }
      return '';
    } catch {
      return '';
    }
  }

  static async getLanguages(
    owner: string,
    repo: string
  ): Promise<Record<string, number>> {
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/languages`;
      return await this.fetchWithRetry<Record<string, number>>(url);
    } catch {
      return {};
    }
  }

  static parseGitHubUrl(url: string): { owner: string; repo: string } | null {
    const match = url.match(/github\.com\/([^/]+)\/([^/.]+)/);
    if (!match) return null;

    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, ''),
    };
  }
}
