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
  const mediaSet = (await import("../lib/media.js")).default;

  function getLocations(pages) {
    const categories = [].concat.apply([], pages.map(category => ("/" + category.slug).toString()));
    const media = [].concat.apply([], pages.map(category => category.items.map(item => ("/" + category.slug + "/" + item.slug).toString())));
    const concatLocations = categories.concat(
      media,
      "",
      "/browse",
    );
    return {
      pages: 
        concatLocations.map(slug => (
          { location: slug }
        )
      )
    }
  }

  res.setHeader('Content-Type', 'text/xml')
  res.write(generateSitemap(getLocations(mediaSet), 'https://www.tiltshop.co'))
  res.end()

  return {
    props: {},
  }
}

const Sitemap = () => null
export default Sitemap