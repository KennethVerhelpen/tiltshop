import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getFormatedDate, getReadingTime } from './utils'
import markdownToHtml from './markdownToHtml'

const postsDirectory = join(process.cwd(), '_posts');

export function getAllPosts(fields = []) {
  const files = fs.readdirSync(postsDirectory)
  if (files.length > 0) {
    const posts = files.map((file) => getPostBySlug(file, fields))
    return posts
  } return [];
}

export function getPostBySlug(file, fields = []) {
  const fileName = file.replace(/\.md$/, '');
  const path = join(postsDirectory, `${fileName}.md`);
  const fileContent = fs.readFileSync(path, 'utf8');
  const { data, content } = matter(fileContent);

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach(async (field) => {
    if (field === 'slug') {
      items[field] = fileName
    }
    if (field === 'content') {
      items[field] = await markdownToHtml(content || '')
    }
    if (field === 'date') {
      data[field] = getFormatedDate(data[field]);
    }
    if (data[field]) {
      items[field] = data[field]
    }
  })
  
  items['time'] = getReadingTime([content, data['excerpt'], data['outro']]);

  return items
}