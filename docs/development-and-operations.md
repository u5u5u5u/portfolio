# 開発・運用ガイド

## 1. 前提

- Node.js: Vite 7 が動作するバージョン（20.19+ または 22.12+ を推奨）
- npm
- microCMS のサービスと `works` API
- 問い合わせを動かす場合は Resend アカウントと認証済み送信元ドメイン
- 本番配信には Vercel プロジェクト

依存関係の正確なバージョンは `package-lock.json` で固定します。

## 2. セットアップ

```bash
npm ci
```

リポジトリルートの `.env.local` にローカル用の値を設定します。秘密値は Git にコミットしないでください。

```dotenv
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-microcms-api-key
RESEND_API_KEY=your-resend-api-key
```

### 環境変数

| 変数 | 必須となる機能 | 参照箇所 | 説明 |
| --- | --- | --- | --- |
| `MICROCMS_SERVICE_DOMAIN` | 作品一覧・詳細 | `vite.config.ts`, `api/works/*` | microCMS のサービスドメイン |
| `MICROCMS_API_KEY` | 作品一覧・詳細 | `vite.config.ts`, `api/works/*` | microCMS API キー |
| `RESEND_API_KEY` | 問い合わせ | `api/send.ts` | Resend API キー |

これらに `VITE_` 接頭辞を付けないでください。接頭辞を付けた値はクライアントバンドルから参照可能になるため、秘密鍵には不適切です。

## 3. 開発コマンド

```bash
npm run dev
```

Vite 開発サーバーを起動します。`vite.config.ts` のミドルウェアにより、作品一覧・詳細 API は同じ開発サーバー上で利用できます。

```bash
npm run lint
npm run build
npm run preview
```

| コマンド | 内容 |
| --- | --- |
| `npm run lint` | ESLint による静的検査 |
| `npm run build` | TypeScript のビルド検査後、Vite で `dist/` を生成 |
| `npm run preview` | 生成済みフロントエンドのローカル確認 |

### 問い合わせのローカル確認

`npm run dev` のカスタムミドルウェアは `/api/send` を実装していません。問い合わせを含む Vercel Functions 全体の確認には、Vercel CLI のローカル開発コマンドを利用してください。その際、実メールが送信されるため送信先と API キーを確認します。

## 4. コンテンツ更新

### プロフィール・経歴

`src/data/profile.ts` を編集します。

- 経歴の内部作品リンクは `http://localhost:...` ではなく `/works/:id` の相対パスを推奨します。
- 日付の表示形式は既存データに合わせて `YYYY.MM` とします。

### スキル

`src/data/skills.ts` を編集します。新しいアイコンは `src/assets/skills/` に追加し、`src/utils/skills.ts` から再エクスポートします。

### 作品

microCMS の `works` API で更新します。スキーマは [API・データ仕様](./api-and-data.md) を参照してください。公開前に最低限、タイトル、サムネイル、概要、作成・更新日時が UI の型と一致することを確認します。

## 5. デプロイ

1. Vercel プロジェクトへリポジトリを接続する。
2. Production、必要に応じて Preview/Development に環境変数を登録する。
3. ビルドコマンドを `npm run build`、出力先を `dist` とする。
4. デプロイ後にトップ、作品一覧、作品詳細への直接アクセス、問い合わせを確認する。

`vercel.json` は現在 `/works` と `/works/:id` を `/index.html` に rewrite します。新しいクライアントルートを増やす場合は、直接アクセス時にも SPA が返るよう rewrite を更新します。

## 6. リリース確認

- `npm run lint` が成功する。
- `npm run build` が成功する。
- `/` の全セクションが表示され、ページ内リンクが動作する。
- トップの作品が最大5件表示される。
- `/works` に作品一覧が表示される。
- `/works/:id` をブラウザへ直接入力して表示できる。
- 存在しない作品 ID の表示を確認する。
- 外部リンクが意図した URL を開く。
- 問い合わせの必須入力、送信中、成功、失敗の各状態を確認する。
- モバイル幅でメニュー、作品スライダー、経歴表示を確認する。
- Vercel の環境変数と Function ログに異常がない。

## 7. 障害切り分け

### 作品が表示されない

1. ブラウザの Network で `/api/works` のステータスを確認する。
2. `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` の登録先環境を確認する。
3. microCMS の `works` API、コンテンツ公開状態、API キー権限を確認する。
4. Vercel Function ログの `Error fetching works...` を確認する。
5. CMS スキーマと TypeScript の型・変換処理の差分を確認する。

### 作品詳細への直接アクセスが失敗する

1. `/api/works/:id` 自体が成功するか確認する。
2. `vercel.json` の rewrite とデプロイ反映を確認する。
3. ID が microCMS 上に存在し、公開されているか確認する。

### 問い合わせが失敗する

1. Network で `/api/send` のレスポンスが JSON か確認する。
2. `RESEND_API_KEY` の登録先環境を確認する。
3. Resend で送信元ドメインと送信元アドレスの認証状態を確認する。
4. Vercel Function ログの `Resend Error` または `Server Error` を確認する。
5. Resend の送信ログ、制限、配信結果を確認する。

## 8. 保守上の優先候補

1. 問い合わせのレート制限・bot対策を追加する。
2. API と画面の自動テストを追加し、CIの検証項目に含める。
3. 全 SPA ルートの404方針を整理する。
4. 固定メールアドレスを環境変数化し、環境ごとの誤送信を防ぐ。
