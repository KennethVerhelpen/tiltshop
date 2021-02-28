import { google } from "googleapis";

const fs = require('fs');
const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const privatKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const spreadsheetId = process.env.SPREADSHEET_ID;

const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const jwt = new google.auth.JWT(
  email,
  null,
  privatKey.replace(/\\n/gm, '\n'),
  scopes
);
const sheets = google.sheets({ version: "v4", auth: jwt });

export async function getTypes() {
  try {
    const types = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "types!A2:X",
    });
    const typesCols = types.data.values;
    if (typesCols.length) {
      return typesCols.map((col) => ({
        id: Number(col[0]) || null,
        slug: col[1] || null,
        name: col[2] || null,
      }));
    }
  } 
  catch (err) { console.log("Error occured while getting the types", err); }
  return [];
}

export async function getTopics() {
  try {
    const topics = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Topics!A2:X",
    });
    const topicsCol = topics.data.values; 
    if (topicsCol.length) {
      return topicsCol.map((col) => ({
        id: Number(col[0]) || null,
        slug: col[1] || null,
        name: col[2] || null,
        type: Number(col[3]) || null,
        articlesCount: Number(col[5]) || null,
        plainDescription: col[6] || null,
        htmlDescription: col[7] || null,
      }));
    }
  } 
  catch (err) { console.log("Error occured while getting the topics", err); }
  return [];
}

export async function getArticles() {
  try {
    const articles =  await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Articles!A2:X",
    });
    const articlesCols = articles.data.values;
    if (articlesCols.length) {
      return articlesCols.map((col) => ({
        id: Number(col[0]) || null,
        title: col[1] || null,
        imgAlt: col[2] || null,
        slug: col[3] || null,
        type: Number(col[4]) || null,
        topic: Number(col[6]) || null,
        category: col[8] || null,
        url: col[9] || null,
        trackingUrl: col[10] || null,
        rating: Number(col[11]) || null,
        price: {
          dollar: Number(col[12]) || null
        },
        description: col[13] || null,
        details: col[14] || null,
        likes: Number(col[15]) || null
      }));
    }
  } 
  catch (err) { console.log("Error occured while getting the articles", err); }
  return [];
}

export async function generateData() {
  async function generateJsonFiles(req, file) {
    const json = JSON.stringify(await req, null, 2);
    fs.writeFile(`./lib/data/${file}.json`, json, function(err, result) {
      if(err) console.log(`Unable to generate a JSON file for ${file}.`, err);
    });
  } return (
    generateJsonFiles(getTypes(), "types"),
    generateJsonFiles(getTopics(), "topics"),
    generateJsonFiles(getArticles(), "articles")
  )
}