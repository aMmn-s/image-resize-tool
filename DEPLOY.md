# Vercel へのデプロイ手順

このドキュメントでは、Vercel CLI を使ってアプリを公開する手順を説明します。

## 前提条件

- Node.js がインストールされていること
- Vercel アカウント（[vercel.com](https://vercel.com) で無料作成可能）

---

## 手順

### 1. Vercel CLI のインストール

```bash
npm install -g vercel
```

グローバルにインストールしたくない場合は、プロジェクト内で次のように実行しても構いません。

```bash
cd /Users/tsukasa/Desktop/AI用/Cursor/image-resize-tool
npx vercel
```

### 2. ログイン（初回のみ）

```bash
vercel login
```

表示されるメールアドレスを入力し、送られてきたリンクを開いて認証します。

### 3. プロジェクトディレクトリに移動

```bash
cd /Users/tsukasa/Desktop/AI用/Cursor/image-resize-tool
```

### 4. デプロイの実行

**プレビュー用（本番以外の環境）:**

```bash
vercel
```

初回は次のような質問が出ます。

- **Set up and deploy?** → `Y` で進める
- **Which scope?** → 自分のアカウントを選択
- **Link to existing project?** → 新規の場合は `N`
- **Project name?** → そのまま Enter（`image-resize-tool` など）
- **In which directory is your code located?** → `./` のまま Enter

するとビルドが走り、プレビュー用の URL（例: `https://image-resize-tool-xxxx.vercel.app`）が表示されます。

**本番（プロダクション）に公開する場合:**

```bash
vercel --prod
```

既に `vercel` で一度デプロイしていれば、同じプロジェクトとして本番用 URL にデプロイされます。

### 5. 確認

ターミナルに表示された URL をブラウザで開き、アプリが表示されることを確認してください。

---

## 補足

- **設定ファイル**: ルートの `vercel.json` で Next.js プロジェクトであることとビルドコマンドを指定しています。通常は Vercel が自動検出するため、なくてもデプロイは可能です。
- **環境変数**: このアプリはクライアントのみで動作するため、環境変数の設定は不要です。
- **カスタムドメイン**: Vercel のダッシュボード（[vercel.com/dashboard](https://vercel.com/dashboard)）から、プロジェクトを選び「Settings」→「Domains」でドメインを追加できます。
