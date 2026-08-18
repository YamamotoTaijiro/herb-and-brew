# ハーブ＆ブリュー（Herb & Brew）

ハーバルティーの調合・試飲イベントの告知と、オリジナルブレンドの販売を行う
小さなハーブティーサロンのウェブサイトです。

- 技術スタック: **Astro** + **Tailwind CSS v4** + **Decap CMS**
- 公開: **GitHub Pages**（静的サイト）
- 表示言語: 日本語

## コマンド

| コマンド | 内容 |
| :-- | :-- |
| `npm install` | 依存関係をインストール |
| `npm run dev` | 開発サーバー起動（`http://localhost:4321`） |
| `npm run build` | 本番ビルド（`./dist/` に出力） |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run check` | 型チェック（`astro check`） |

## 構成

```text
/
├── public/
│   ├── admin/
│   │   └── config.yml      # Decap CMS 設定
│   ├── images/             # 管理画面からアップロードされる画像の保存先
│   └── favicon.svg
└── src/
    ├── content.config.ts   # コンテンツコレクション定義（ブレンド / イベント）
    ├── content/
    │   ├── blends/         # ブレンド（1ファイル = 1商品）
    │   └── events/         # イベント（1ファイル = 1イベント）
    ├── layouts/Base.astro  # 共通レイアウト（ヘッダー / フッター）
    ├── components/         # 共通コンポーネント
    ├── data/site.ts        # サイト情報・ナビゲーション
    ├── pages/
    │   ├── index.astro     # トップ
    │   ├── blends/         # ブレンド一覧 / 詳細
    │   ├── events/         # イベント一覧 / 詳細
    │   ├── about.astro     # 店舗紹介
    │   ├── contact.astro   # お問い合わせ
    │   └── admin/          # 管理画面（/admin/）
    └── styles/global.css   # Tailwind + デザイントークン
```

## コンテンツの更新（管理画面）

管理画面（Decap CMS）は GitHub リポジトリに直接コミットする方式のため、GitHub の
**OAuth認証**が必要です。GitHub Pages は静的サイトで認証サーバーを持てないため、
認証を仲介する小さなプロキシ（[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)、
無料の Cloudflare Workers で動作）を1つデプロイする必要があります。

### 1. OAuthプロキシをデプロイする（初回のみ）

1. [Cloudflare](https://dash.cloudflare.com/sign-up) の無料アカウントを作成
2. [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) の README にある
   「Deploy to Cloudflare」ボタンから Worker をデプロイ
   （またはリポジトリを clone して `wrangler deploy`）
3. デプロイ後に発行される Worker の URL を控える
   （例: `https://sveltia-cms-auth.<あなたのサブドメイン>.workers.dev`）

### 2. GitHub OAuth App を作成する

1. GitHub → Settings → Developer settings →
   [OAuth Apps](https://github.com/settings/applications/new) → New OAuth App
2. 以下を設定して登録:
   - **Homepage URL**: `https://<ユーザー名>.github.io/<リポジトリ名>/`
   - **Authorization callback URL**: `<Workerのurl>/callback`
3. 発行された **Client ID** と **Client Secret** を控える

### 3. Worker に環境変数を設定する

Cloudflare Workers のダッシュボード → 対象Worker → Settings → Variables で以下を追加:

| 変数名 | 値 |
| :-- | :-- |
| `GITHUB_CLIENT_ID` | 手順2で発行された Client ID |
| `GITHUB_CLIENT_SECRET` | 手順2で発行された Client Secret（Encrypt推奨） |
| `ALLOWED_DOMAINS` | `<ユーザー名>.github.io`（サイトのホスト名） |

### 4. `config.yml` を自分の環境に合わせる

`public/admin/config.yml` の `repo` と `base_url` を書き換える:

```yaml
backend:
  name: github
  repo: "taijiro/herb-and-brew"
  branch: "main"
  base_url: "https://sveltia-cms-auth.<あなたのサブドメイン>.workers.dev"
```

### 5. ログインして編集する

1. サイトを公開後、`https://<ユーザー名>.github.io/<リポジトリ名>/admin/` を開く
2. 「GitHub でログインする」から GitHub アカウントでログイン
3. 「ブレンド」「イベント」から記事の追加・編集を行う

編集内容は `src/content/blends/` / `src/content/events/` 配下の Markdown ファイルとして
リポジトリにコミットされ、GitHub Pages の再ビルドで反映されます。

> ローカルでの動作確認だけでよい場合は、上記の設定は不要です。
> `config.yml` に `local_backend: true` を追加し、`npx decap-server` と
> `npm run dev` を同時に起動すれば、ローカルの管理画面からファイルを直接編集できます
> （この場合、公開URLからはログインできません）。

### 各フィールドの役割（ブレンド）

| フィールド | 説明 |
| :-- | :-- |
| `title` | ブレンド名 |
| `slug` | URL（英小文字・ハイフン） |
| `description` | カードに表示する説明 |
| `price` | 税込価格（円） |
| `weight` | 内容量（例: 20g） |
| `ingredients` | 配合 |
| `effects` | こんなときに（効果） |
| `image` | 画像（`/images/` 以下に保存） |
| `featured` | トップページに載せる |
| `buyUrl` | Stripe 決済リンク（空欄なら「準備中」表示） |

## オンライン販売（Stripe 決済リンク）

本サイトは静的サイトのため、決済は **Stripe の決済リンク** を使う想定です。

1. [Stripe](https://stripe.com) にアカウントを作成し、商品ごとに「決済リンク」を作成
2. 管理画面の各ブレンドの `buyUrl` に決済リンクを貼り付け
3. ブレンド詳細ページの「このブレンドを購入する」ボタンが有効になる

## GitHub Pages への公開

1. 新規リポジトリを作成（例: `herb-and-brew`）
2. ローカルで以下を実行

   ```sh
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/<ユーザー名>/herb-and-brew.git
   git push -u origin main
   ```

3. リポジトリの **Settings → Pages → Build and deployment** で:
   - Source: **GitHub Actions** を選択
   - `.github/workflows/deploy.yml` が自動でビルド・デプロイします
4. 数分で `https://<ユーザー名>.github.io/herb-and-brew/` に公開されます

> プロジェクトページ（`/リポジトリ名/` 配下）で公開する場合は、
> `astro.config.mjs` の `site` と各ページのパスにベースパスを考慮してください。
> （現在の構成はルート `/` 前提です）

## 今後の拡張候補

- 管理画面のログインを OAuth 方式に切り替え
- お問い合わせフォームを Formspree 等のフォームサービスに差し替え
- 決済を Stripe Checkout セッション（カート対応）に拡張
- 検索機能・カテゴリ分けの追加
