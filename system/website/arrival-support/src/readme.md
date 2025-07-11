## 空港到着サポートサービス – Webサイト構成資料

### 1. 目的

日本人旅行者向けに、タイ・バンコク到着時のSIM購入やアプリ設定などを支援するサービスの案内・予約サイト。

---

### 2. ディレクトリ構成

```
/
├── index.html                # トップページ（サービス概要と特徴）
├── about.html                # 事業概要と安心サポートの説明
├── services/
│   ├── sim-support.html      # SIM購入・設定サポート
│   ├── app-setup.html        # スマホアプリ（LINE, Grab等）設定支援
│   └── full-package.html     # フルサポートプラン（全対応パッケージ）
├── booking/
│   ├── form.html             # 予約フォーム（希望日・便名・宿泊先等）
│   └── confirmation.html     # 予約完了通知ページ
├── contact.html              # お問い合わせフォーム
├── faq.html                  # よくある質問
├── assets/
│   ├── css/                  # スタイルシート（デザイン・レイアウト）
│   ├── js/                   # JavaScript（バリデーション等）
│   └── images/               # 画像素材
└── privacy.html              # プライバシーポリシー
```

---

### 3. 将来的な拡張例

* `/tour/` ディレクトリにて観光ツアー事業と統合可能
* `/admin/` ディレクトリにて社内予約管理機能を実装可能
* 多言語対応のためのディレクトリ分割（例：`/jp/`, `/en/`）

---

### 4. 備考

* フロントエンドは Vanilla JS + HTML/CSS を基本とし、軽量かつ保守性の高い構成とする
* LINE連携やメール通知との連動を前提とした運用が可能
