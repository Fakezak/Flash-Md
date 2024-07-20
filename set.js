const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUdtTW4rUzNMS2ZWcmhTSlM0cDJXVXljaWE3SFVtTWhXNGY3VEtSdEpGcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWFVY3JjOStaVkUvbm1PdlQ2aG04YUlJdnFhZWkvNllZWnpDYVZaR3R4TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTDFZblJWUWk0NXMya3J4Um1HZCsxZDVPajJ1WFJTZm5XS2Z6OEJIY2swPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiSUNxQjQzaDRXdmlOUkhxa0pieG9iNnBWWG5lVWtCb3RxWm83TmtYR1h3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNGTVdZUWMrV3cxdHNneG5HSXFISUVHblFISm0rb0ZvR0RNMS9NWTdQRWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inc4MVVUbzdXMmZWYjRYTk9kQnlSRm05TmFjeDl4aVJvSW5Pb3plY1lxQnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0g4eE9UVEZxTlQyN1J2QjZWODNrekdBNkliTExNZzdURFQ3elQyeTRXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN3RNVitlUXJMcXNCQ1Y3WUF3djBrZkdybk1IQjlKd095VXZwSzVRR0hGZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFCSGlqRU43eVVNR2N0UzlxV0x1WHUwa0ZOZDlpcWpuMy9PNWMyeCs1YnBuL3NpZlRLQkFCSTJubUFybWUxeFFKejlFaGVnVmhnVG4yRHZVem00UWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM0LCJhZHZTZWNyZXRLZXkiOiJCQ2NZUnAvdmVOUjRpcFYvYXpybVlwQjlGeUpjdzRTd1NhcWd1ZWRiWFRZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJVZ25YMXJpX1EzLWhGaXU1Tm1ORDh3IiwicGhvbmVJZCI6IjFhOTYwM2VkLWUyZGQtNDhiOS1hOTM4LTRmMmU1M2M4MmIyZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTzNFUVhmTkp6SERnc21RL2tIcWk3SUcrRms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDd6QWFLQjZiOGwvOEdGTU9waEhlc3ZjOGJzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBZQ0ZDNDExIiwibWUiOnsiaWQiOiIxODc2ODM3NTI1NDoyOUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTzN6c3ZvR0VOYjg3YlFHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYkxOdGJ4dkttRjY4SXNtMzFvdGY3TWdzNHFKcHllWnN4YWdCNjE0akpVWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoic3I5dVhWMC95ZTZLaW16bVpDYnI1dGUvd3lZNnVyVXNuVTFVMytmTTlBNlhUangrZlAvemVrajRtWk05Z2FQM3V5U29HdFk3TDJYY0NEc0dJZUkvQmc9PSIsImRldmljZVNpZ25hdHVyZSI6ImpFTUVqY0hJVXpjd1Z4dkJWTVdtQTlRTW4wNkxnMEt6TUt2akVzSGNqQ042aU9qWXhIUDlMRnlyUXlQckwwSmF6SkF3SkVoTmxlYmk0SG9Nek0yM2pBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTg3NjgzNzUyNTQ6MjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV3l6Ylc4YnlwaGV2Q0xKdDlhTFgreklMT0tpYWNubWJNV29BZXRlSXlWRyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTQ2NjQ2NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPc3oifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "18768375254", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
