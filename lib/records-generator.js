import { types, topics, articles } from "./data";

const fs = require('fs');

export function alterRecords(data, file) {
  for (var i=0; i<data.length; i++) {
    if (data[i].type) {
      const newType = types.find(type => type.id === data[i].type);
      data[i].type = newType.name;
    }
    if (data[i].topic) {
      const newTopic = topics.find(topic => topic.id === data[i].topic);
      data[i].topic = newTopic.name;
    }
    fs.writeFileSync(`./lib/records/${file}.json`, JSON.stringify(data, null, 2));
  } return ;
}

export async function generateRecords() {
  async function copyJsonFiles(data, file) {
    await fs.copyFile(`./lib/data/${file}.json`, `./lib/records/${file}.json`, function(err, result) {
      alterRecords(data, file);
      if(err) console.log(`Unable to copy JSON file for ${file}.`, err);
    });
  } return (
    copyJsonFiles(topics, "topics"),
    copyJsonFiles(articles, "articles")
  )
}