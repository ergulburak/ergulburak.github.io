import { getAllPosts } from '@/lib/posts';
import { CommandPaletteClient } from './CommandPaletteClient';

export function CommandPalette() {
  const posts = getAllPosts();
  return <CommandPaletteClient posts={posts} />;
}
