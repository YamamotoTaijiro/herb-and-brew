// ベースパス（GitHub Pages の公開先）を考慮した内部リンク生成
// 例: BASE_URL="/"      → link("/blends/") = "/blends/"
//     BASE_URL="/herb-and-brew/" → link("/blends/") = "/herb-and-brew/blends/"
const base = import.meta.env.BASE_URL;

export function link(path: string): string {
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }
  return `${base}${path.replace(/^\//, '')}`;
}
