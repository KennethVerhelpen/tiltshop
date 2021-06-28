import remark from 'remark';
import html from 'remark-html';
import unwrapImages from 'remark-unwrap-images';

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(unwrapImages)
    .use(html)
    .process(markdown)
  return result.toString()
}