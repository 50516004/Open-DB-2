## 概要
テーブルデータ(表形式のデータ)を作成、公開できるWebアプリケーション。  
Vercelで稼働中→https://open-db-2.vercel.app  

## 現行機能
- テーブルの作成(手動、またはCSVからのインポート)
- テーブルの一覧表示
- テーブルの内容表示、フィルター、ソート

## 使用ツール

| ツール | カテゴリ | 用途 |
| :--- | :--- | :--- |
| Next.js | フレームワーク | ルーティング、API、認証(NextAuth) |
| TypeScript | 言語 | React、Server Actionsのコーディング |
| React.js | フロントエンド | UIコンポーネントの作成 |
| Tailwind CSS | スタイリング | UIのスタイリング |
| daisyUI | スタイリング | Tailwindライブラリ |
| Vercel Postgres Database | データベース | ユーザ情報、テーブル情報の保存 |
| Vercel Blob Store | ファイルストレージ | テーブルデータ(テキストファイル)の保存 |

## フォルダ構成

主に開発で使用されるものを記載。  
※[Next.jsの公式チュートリアル](https://nextjs.org/learn?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=home)
のプロジェクトを拡張して開発しているので  
アプリケーションに不要なファイルも含まれています。

| ファイル/フォルダ | 内容 |
| :--- | :--- |
| public | 静的リソース(アイコン等) |
| scripts | データベースの初期化スクリプト |
| src | アプリケーションコード |
| auth.config.ts | NextAuth.jsの設定ファイル |
| auth.ts | NextAuth.jsで生成された認証用API |

## データベース設計
### users
| カラム | タイプ | 内容 |
| :--- | :--- | :--- |
| id | UUID PRIMARY KEY | ユーザID |
| name | VARCHAR(255) NOT NULL | ユーザ名 |
| email | TEXT NOT NULL UNIQUE | メールアドレス |
| password | TEXT NOT NULL | パスワード |
### tables
| カラム | タイプ | 内容 |
| :--- | :--- | :--- |
| table_id | UUID PRIMARY KEY | テーブルID |
| creator_id | UUID NOT NULL | 作成ユーザID |
| title | VARCHAR(255) NOT NULL | テーブル名 |
| updated_at | DATE DEFAULT CURRENT_DATE | 更新日 |
| view | INT DEFAULT 0 | 閲覧数 |

## 環境構築

### パッケージのインストール
```
pnpm i
```
### 開発用サーバの起動
```
pnpm dev
```

