import prisma from "../lib/prisma";

const generateSitemap =(data, origin) => {
  let xml = ''

  data.pages.map(page => {
    xml += `<url>
      <loc>${origin + page.location}</loc>
    </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xml}
    </urlset>`
}

export async function getServerSideProps({ res }) {
  const types = await prisma.type.findMany();
  const topics = await prisma.topic.findMany();
  const articles = await prisma.article.findMany();

  const typeSlugs = [].concat.apply([], types.map(
    type => ("/" + type.slug).toString()
  ));
  const topicSlugs = [].concat.apply([], topics.map(
    topic => ("/" + types.find(type => type.id === topic.typeId).slug + "/" + topic.slug).toString()
  ));
  const articleSlugs = [].concat.apply([], articles.map(article => (
    "/" + types.find(type => type.id === article.typeId).slug + "/" + topics.find(topic => topic.id === article.topicId).slug + "/" + article.slug).toString()
  ));

  const slugs = [].concat(
    "",
    "/",
    typeSlugs,
    topicSlugs,
    articleSlugs
  );

  function getPaths(params) {
    return {
      pages: 
        params.map(param => (
          { location: param }
        )
      )
    }
  }

  res.setHeader('Content-Type', 'text/xml')
  res.write(generateSitemap(getPaths(slugs), 'https://www.tiltshop.co'))
  res.end()

  return {
    props: {},
  }
}

const Sitemap = () => null
export default Sitemap