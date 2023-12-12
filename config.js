const { Sequelize } = require('sequelize');
const fs = require('fs');

if (fs.existsSync('config.env')) {
  require('dotenv').config({ path: './config.env' });
}

const toBool = (x) => x === 'true';

const DATABASE_URL = process.env.DATABASE_URL || './database.db';

module.exports = {
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  ANTILINK_ACTION: process.env.ANTI_LINK || 'kick',
  SESSION: process.env.SESSION || 'jsl~01c79hK2pe533ea8f1c1391dd11ab962c98c',
  LANG: process.env.LANG || 'EN',
  HANDLERS: process.env.HANDLER === 'false' || process.env.HANDLER === 'null' ? '^' : '^[!]',
  RMBG_KEY: process.env.RMBG_KEY || false,
  BRANCH: 'main',
  PACKNAME: process.env.PACKNAME || 'Jsl',
  WELCOME_MSG: process.env.WELCOME_MSG || 'Hi @user Welcome to @gname',
  GOODBYE_MSG: process.env.GOODBYE_MSG || 'Hi @user It was Nice Seeing you',
  AUTHOR: process.env.AUTHOR || 'Afx-Abu',
  SUDO: process.env.SUDO || '918943027806',
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || '',
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || '',
  OWNER_NAME: process.env.OWNER_NAME || 'Jsl',
  BOT_NAME: process.env.BOT_NAME || 'Abu',
  WORK_TYPE: process.env.WORK_TYPE || 'public',
  DATABASE_URL: DATABASE_URL,
  DATABASE: DATABASE_URL === './database.db'
    ? new Sequelize({
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
      }),
};
    
