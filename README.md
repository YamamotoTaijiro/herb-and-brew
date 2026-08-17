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

1. `public/admin/config.yml` の `repo` を自分のリポジトリに書き換える
   （例: `repo: "taijiro/herb-and-brew"`）
2. サイトを公開後、`https://<ユーザー名>.github.io/<リポジトリ名>/admin/` を開く
3. 「Sign in」で GitHub の **パーソナルアクセストークン** を貼り付けてログイン
   （トークン作成: GitHub → Settings → Developer settings → Personal access tokens →
   Fine-grained tokens。対象リポジトリに **Contents: Read and write** 権限を付与）
4. 「ブレンド」「イベント」から記事の追加・編集を行う

編集内容は `src/content/blends/` / `src/content/events/` 配下の Markdown ファイルとして
リポジトリにコミットされ、GitHub Pages の再ビルドで反映されます。

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
