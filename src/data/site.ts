export const site = {
  name: "Herb & Brew",
  nameJa: "ハーブ＆ブリュー",
  tagline: "調合する、淹れる、味わう。",
  description:
    "ハーバルティーの調合と試飲イベント、オリジナルブレンドの販売を行う小さなハーブティーサロンです。",
  email: "hello@herb-and-brew.example",
  address: "東京都渋谷区 0-0-0",
  social: {
    instagram: "https://instagram.com/",
  },
} as const;

export const nav = [
  { label: "ブレンド", href: "/blends/" },
  { label: "イベント", href: "/events/" },
  { label: "店舗紹介", href: "/about/" },
  { label: "お問い合わせ", href: "/contact/" },
] as const;
