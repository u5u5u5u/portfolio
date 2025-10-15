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
  },
  {
    title: "Kyutech Guide",
    description: "九州工業大学飯塚キャンパスを紹介するARを用いた大学案内アプリ",
    tags: ["Unity", "Geospatial API", "ARCore", "ARKit"],
  },
  {
    title: "地球っ子ネットワーク",
    description:
      "九州工業大学教育ボランティア団体「地球っ子ネットワーク」のホームページ",
    tags: ["Next.js", "TypeScript", "Three.js", "microCMS API"],
  },
  {
    title: "まちゃろぐ",
    description: "抹茶スイーツを共有するSNS",
    tags: ["Next.js", "TypeScript", "Supabase"],
  },
];
