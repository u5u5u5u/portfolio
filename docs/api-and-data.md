# API・データ仕様

## 1. 共通事項

- 本番 API は Vercel Functions として `api/` 配下に実装する。
- 成功レスポンスとエラーレスポンスは JSON を返す。
- 作品 API は microCMS の `works` エンドポイントを参照する。
- 開発用 Vite ミドルウェアは作品 API の GET のみを提供する。
- 認証用の環境変数はサーバー側だけで利用する。

## 2. `GET /api/works`

作品一覧を取得します。

### クエリ

| 名前 | 型 | 必須 | 既定値 | 説明 |
| --- | --- | --- | --- | --- |
| `limit` | integer | いいえ | `10` | 取得件数 |
| `offset` | integer | いいえ | `0` | 取得開始位置 |
| `orders` | string | いいえ | なし | `publishedAt` または `-publishedAt` |

`limit` は1〜100、`offset` は0〜10,000の整数だけを許可します。不正なクエリは `400` を返します。

### 成功 `200`

```json
{
  "works": [
    {
      "id": "content-id",
      "title": "作品名",
      "thumbnail": "https://example.microcms-assets.io/...",
      "summary": "作品概要",
      "tech": [{ "name": "React" }],
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-02T00:00:00.000Z"
    }
  ],
  "totalCount": 1
}
```

### エラー

| HTTP | 条件 | 例 |
| --- | --- | --- |
| `405` | GET 以外 | `{ "error": "Method Not Allowed" }` |
| `500` | CMS 接続・取得・変換失敗 | `{ "error": "Failed to fetch works", "details": "..." }` |

## 3. `GET /api/works/:id`

指定 ID の作品詳細を取得します。

### パスパラメータ

| 名前 | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `id` | string | はい | microCMS のコンテンツ ID |

### 成功 `200`

レスポンスは後述する `Work` 1件です。

### エラー

| HTTP | 条件 | 例 |
| --- | --- | --- |
| `400` | ID がない、または単一文字列でない | `{ "error": "Invalid or missing id parameter" }` |
| `405` | GET 以外 | `{ "error": "Method Not Allowed" }` |
| `500` | CMS 接続・対象取得失敗 | `{ "error": "Internal Server Error" }` |

microCMS の未存在エラーも現行実装では `500` にまとめられます。

## 4. `POST /api/send`

問い合わせ内容を運営者へメール送信します。

### リクエスト

`Content-Type: application/json`

```json
{
  "name": "山田 太郎",
  "affiliation": "Example Inc.",
  "email": "taro@example.com",
  "message": "お問い合わせ内容"
}
```

| フィールド | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `name` | string | はい | 送信者名 |
| `affiliation` | string | いいえ | 所属 |
| `email` | string | はい | 返信先メールアドレス |
| `message` | string | はい | 問い合わせ本文 |

サーバー側でも型、必須値、メール形式、各項目の最大文字数を検証します。

### 成功 `200`

```json
{
  "message": "Email sent successfully",
  "data": {}
}
```

`data` は Resend の送信結果です。

### エラー

| HTTP | 条件 | 例 |
| --- | --- | --- |
| `400` | 必須項目不足 | `{ "error": "Missing required fields" }` |
| `405` | POST 以外 | `{ "error": "Method Not Allowed" }` |
| `500` | Resend の送信失敗 | `{ "error": "Failed to send email" }` |
| `500` | その他のサーバー例外 | `{ "error": "Internal Server Error" }` |

送信元アドレスと送信先アドレスは現在 `api/send.ts` に固定されています。変更時は Resend 側で送信元ドメインの認証状態も確認してください。

## 5. UI 用作品モデル

`src/types/work.ts` の `Work` を画面と API の境界モデルとして使用します。

| フィールド | 型 | 必須 | 用途 |
| --- | --- | --- | --- |
| `id` | `string` | はい | 作品 ID、詳細 URL |
| `title` | `string` | はい | 作品名 |
| `thumbnail` | `string` | はい | 画像 URL |
| `summary` | `string` | はい | カード・詳細の概要 |
| `tech` | `{ name: string }[]` | いいえ | 使用技術 |
| `awards` | `string[]` | いいえ | 受賞歴 |
| `background` | `string` | いいえ | 制作背景 |
| `purpose` | `string` | いいえ | 目的 |
| `function` | `string[]` | いいえ | 機能一覧 |
| `number` | `number` | いいえ | 制作人数 |
| `role` | `string[]` | いいえ | 担当範囲 |
| `presentation` | `string[]` | いいえ | 発表実績 |
| `duration` | `string` | いいえ | 制作期間 |
| `webUrl` | `string` | いいえ | 公開 URL |
| `github` | `string` | いいえ | リポジトリ URL |
| `outname` | `string` | いいえ | 外部記事名 |
| `outLink` | `string` | いいえ | 外部記事 URL |
| `date` | `string` | いいえ | 制作日 |
| `description` | `string` | いいえ | microCMS リッチエディター由来の詳細 |
| `createdAt` | `string` | はい | 作成日時 |
| `updatedAt` | `string` | はい | 更新日時 |

一覧レスポンスは `{ works: Work[], totalCount: number }` です。

## 6. microCMS モデルと変換

microCMS 側の作品には `Work` の各フィールドに加えて `publishedAt` と `revisedAt` があります。技術情報は別モデル相当の `Tech` として ID、名称、各種日時を持ちます。

API では次のように公開用データへ縮約します。

- `tech` は `{ name }` だけを残す。
- CMS の `publishedAt`、`revisedAt` は公開レスポンスから除外する。
- 一覧・詳細・開発用 API は共通の変換関数を利用する。
- `thumbnail` は型上 `string` として扱うため、microCMS の画像フィールドを利用する場合は API 応答形状との一致を維持する。

CMS スキーマを変更するときは、`src/types/microCMS/index.ts`、`src/types/work.ts`、2つの作品 API、詳細表示の全てを確認してください。

## 7. セキュリティ上の境界

- `MICROCMS_API_KEY` と `RESEND_API_KEY` はブラウザへ公開しない。
- 問い合わせ本文には文字数制限がありますが、レート制限とbot対策の追加を推奨する。
- 外部 URL は CMS・静的データ由来であり、登録値を信頼できる運用にする。
