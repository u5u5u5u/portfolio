# ポートフォリオ ドキュメント

このディレクトリは、ポートフォリオサイトの現行実装（2026-08-07 時点）を基にした設計・開発・運用資料です。

## ドキュメント一覧

| ドキュメント | 内容 |
| --- | --- |
| [システム設計](./architecture.md) | システム構成、責務、処理フロー、技術選定 |
| [画面・機能仕様](./features.md) | ルーティング、画面構成、各機能の挙動 |
| [API・データ仕様](./api-and-data.md) | API 契約、作品データ、microCMS との変換 |
| [開発・運用ガイド](./development-and-operations.md) | 環境構築、環境変数、ビルド、デプロイ、保守 |

## システム概要

個人のプロフィール、経歴、保有スキル、制作実績を公開し、訪問者からの問い合わせを受け付けるポートフォリオサイトです。

- フロントエンド: React 19 + TypeScript + Vite
- コンテンツ管理: microCMS
- API: Vercel Functions
- メール送信: Resend
- ホスティング・アクセス解析: Vercel
- 主な画面: トップ、作品一覧、作品詳細

## ソースコード対応表

```text
portfolio/
├── api/                 # Vercel Functions（作品取得・問い合わせ送信）
├── public/              # favicon、サイトアイコン
├── src/
│   ├── assets/          # スキルアイコン
│   ├── components/      # トップ画面と共通 UI
│   ├── data/            # プロフィール・経歴・スキルの静的データ
│   ├── pages/           # 作品一覧・作品詳細
│   ├── types/           # アプリ・microCMS の型定義
│   ├── utils/           # アセットの再エクスポート
│   ├── App.tsx          # トップ画面の構成
│   └── main.tsx         # React 起動・ルーティング
├── docs/                # 本ドキュメント
├── vite.config.ts       # Vite と開発用作品 API
└── vercel.json          # SPA 向け rewrite
```

## 文書更新のルール

次の変更を行った場合は、対応する文書も同じ変更内で更新してください。

- 画面、ルート、表示項目の変更: `features.md`
- API、環境変数、CMS スキーマの変更: `api-and-data.md`
- 構成や外部サービスの変更: `architecture.md`
- セットアップ、ビルド、デプロイ方法の変更: `development-and-operations.md`

