const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0dudXlCejFzY0NNZ3B1OXNVR1N1Q2d3YnZqQmxQeDNnVk9kbVJQRG1VND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUM1KzRtcjhCQUNjQ0N1aUg4YWxBTEs2eWg3c1hwSG9pa3MwUUhnR3dFbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQTc3SEUvdHluOVJDMkIwMzZ3N2ZjcXk0RzZnT2Q5MkU3NDJZcFFkbzJjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3UFJselNiekE1bldSYUphU2h0TCtXVmFMSEVpaGR5MVFDR0pQclVKSG13PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklNOHNncnlwUEtUc0lXa1RUd05md1dIVGFPaGlBRWhxSEVNaENWczdBbEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImE2bXJlZmlOR0Q5OXlpYVlrQnNFNlliYm51UTNBbzNiMnZTMm1aWWtBRWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZjTXRmVWJKenRYa3E0SURxc0JTTHR3QjlnSDg4bEJhRDR6QkE4SC9GTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUHROU1FNSzVidlVQOTZsTVZYUGRia240U0VIb1hyNmtjd0g0UTdpZzdoVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9ISXBJaHZlcEU5U1Y0dUFhYkZtT3dPZWRYS0R2STN6bjBBRERxc3UrZkQ2VTBheldITHIxYkp4d3M4djY5MkdHbVAvWkVwUkFzK3UwbHJub2VwWWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzIsImFkdlNlY3JldEtleSI6ImdkakljNG9iaUtybHVuMDgwYjdKbVl1ZVJZdEVaUjlIZ0h6OFJ6REcwdW89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IndYRHpnbU4zU28tbXZST1BRZDlBSVEiLCJwaG9uZUlkIjoiMWEyOThmNTgtNmIxOC00YjQyLWE0NWMtYWU3MjVjOWY2ZTZhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktGSzlDYy80WlFZcEJRZGk1WGdZNGRoSVVJYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6dnFseDVlUVZGdjQ2QUJaOE1kWUY1bE8zbEE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVkJEU1dTMkUiLCJtZSI6eyJpZCI6IjIzNDkwMzM3Njk3Mjc6MTVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ29hY2ggSm9zZXBoIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQaVYwSklFRUluU2dMVUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJocWREQkNPRm81cWVmSHdyQmhVcGc5K2VidnNUb25JYXdQY0lkcWFQdGlNPSIsImFjY291bnRTaWduYXR1cmUiOiJTSkYzM0x5eFZXek5ucDVQQVprclppUjJZOExwR1ZwUVhBVWVsS21RV0xlSk1KRG9uSXBBM0JEOCtBSjZBa1hweDg4RnFIM2lQa2tUY1NXRERCMVNEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZnltOWNLQXF2Vk5XRWZqdWZpazVjeXo1MFZzQnZscWR2RE5ISXFha2RRWEtEd2wxcHg0TkpkUkRkcjB5eW5sV1NBRG1FaDNlZkc0eVpZRXFNZTlCZ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDMzNzY5NzI3OjE1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllhblF3UWpoYU9hbm54OEt3WVZLWVBmbm03N0U2SnlHc0QzQ0hhbWo3WWoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE3NzIzMTB9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "CoachJoseph",
    NUMERO_OWNER : process.env.OWNER_NUM || "2349033769727",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
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
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
