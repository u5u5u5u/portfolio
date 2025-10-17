export interface WorkType {
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
  tags: string[] | [];
}

export const works: WorkType[] = [
  {
    title: "e-ZUKA journey",
    description: "飯塚市の観光地を巡り、ARコンテンツで楽しむ観光案内アプリ",
    tags: ["Unity", "PlateauSDK", "VPS", "ARCore", "ARKit"],
    imageUrl:
      "https://pub-fcd0f7c6926e49c8b6b6e33b994dd2f0.r2.dev/e-zuka-journey/e-zuka-journey.png",
  },
  {
    title: "Kyutech Guide",
    description: "九州工業大学飯塚キャンパスを紹介するARを用いた大学案内アプリ",
    tags: ["Unity", "Geospatial API", "ARCore", "ARKit"],
    imageUrl:
      "https://pub-fcd0f7c6926e49c8b6b6e33b994dd2f0.r2.dev/kyutech-guide/kyutech-guide.png",
  },
  {
    title: "地球っ子ネットワーク HP",
    description:
      "九州工業大学教育ボランティア団体「地球っ子ネットワーク」のホームページ",
    tags: ["Next.js", "TypeScript", "Three.js", "microCMS API"],
    imageUrl:
      "https://pub-fcd0f7c6926e49c8b6b6e33b994dd2f0.r2.dev/chinet-hp/chinet_icon.png",
  },
  {
    title: "まちゃろぐ",
    description: "抹茶スイーツを共有するSNS",
    tags: ["Next.js", "TypeScript", "Supabase"],
    imageUrl:
      "https://pub-fcd0f7c6926e49c8b6b6e33b994dd2f0.r2.dev/matcha-log/matcha-log.png",
  },
];
