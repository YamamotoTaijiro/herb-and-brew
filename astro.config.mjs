// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pages の「プロジェクトページ」（username.github.io/<リポジトリ名>/）で
// 公開する場合、BASE_PATH に「/<リポジトリ名>/」を設定してください。
//   例: BASE_PATH = '/herb-and-brew/'
// ローカル開発や「ユーザーサイト」（username.github.io）では '/' のままで大丈夫です。
// GitHub Actions では .github/workflows/deploy.yml がリポジトリ名から自動設定します。
const BASE_PATH = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  base: BASE_PATH,
  vite: {
    plugins: [tailwindcss()],
  },
});
