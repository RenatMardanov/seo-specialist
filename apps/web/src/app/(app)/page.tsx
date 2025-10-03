import { Button } from '@seo-specialist/ui';
import { getPages } from './test';
const pages = await getPages();
export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.none file.
   */
  console.log(pages);
  return (
    <div>
      <Button>Click me</Button>
      {pages.docs.map((page) => (
        <div key={page.id}>{page.title}</div>
      ))}
    </div>
  );
}
