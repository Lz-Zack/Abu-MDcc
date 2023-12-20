const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers,
} = require("@whiskeysockets/baileys");
const path = require("path");
const { Image, Message, Sticker, Video } = require("./lib/base");
let fs = require("fs");
let config = require("./config");
const pino = require("pino");
logger = pino({ level: "silent" });
const plugins = require("./lib/plugins");
const { serialize, Greetings } = require("./lib");
const { PluginDB } = require("./lib/database/plugins");

fs.readdirSync(__dirname + "/lib/database/").forEach((plugin) => {
  if (path.extname(plugin).toLowerCase() == ".js") {
    require(__dirname + "/lib/database/" + plugin);
  }
});

const Jsl_0x8b902d=Jsl_0xcc7b;(function(_0x45052f,_0x3fafaf){const _0x5a2c12=Jsl_0xcc7b,_0x59edc8=_0x45052f();while(!![]){try{const _0xd0a4fb=-parseInt(_0x5a2c12(0x137))/0x1+-parseInt(_0x5a2c12(0x139))/0x2+-parseInt(_0x5a2c12(0x140))/0x3+-parseInt(_0x5a2c12(0x146))/0x4+parseInt(_0x5a2c12(0x138))/0x5*(-parseInt(_0x5a2c12(0x14b))/0x6)+-parseInt(_0x5a2c12(0x148))/0x7*(parseInt(_0x5a2c12(0x149))/0x8)+parseInt(_0x5a2c12(0x13d))/0x9;if(_0xd0a4fb===_0x3fafaf)break;else _0x59edc8['push'](_0x59edc8['shift']());}catch(_0x5ad385){_0x59edc8['push'](_0x59edc8['shift']());}}}(Jsl_0x241b,0xd290e));function decrypt(_0x5c7b49){const _0x150309=Jsl_0xcc7b;let _0x4b28b0=_0x5c7b49[_0x150309(0x13a)](''),_0x3eee54='',_0x414a1e='',_0x5f4f5d='',_0x49f441;return _0x4b28b0['map'](_0x1e83b1=>{_0x3eee54['length']<0x5?_0x3eee54+=_0x1e83b1:_0x414a1e=_0x5c7b49['replace'](_0x3eee54,'');let _0x31cf66=_0x414a1e['split']('');_0x31cf66['map'](_0xb3a831=>{const _0x5cbba5=Jsl_0xcc7b;_0x5f4f5d[_0x5cbba5(0x144)]<0x4&&(_0x5f4f5d+=_0xb3a831);});}),_0x49f441=_0x3eee54+_0x5c7b49[_0x150309(0x13b)](_0x3eee54,'')[_0x150309(0x13b)](_0x5f4f5d,''),_0x49f441;}let plaintext=config['SESSION_ID'][Jsl_0x8b902d(0x13f)](Jsl_0x8b902d(0x14a),''),session=decrypt(plaintext);const axios=require('axios');function Jsl_0xcc7b(_0x2722b,_0x58bcb7){const _0x241b90=Jsl_0x241b();return Jsl_0xcc7b=function(_0xcc7b4f,_0x5a54c4){_0xcc7b4f=_0xcc7b4f-0x137;let _0x36ec8e=_0x241b90[_0xcc7b4f];return _0x36ec8e;},Jsl_0xcc7b(_0x2722b,_0x58bcb7);}async function connect(_0x36298b){const _0x56a06a=Jsl_0x8b902d;!_0x36298b&&(console[_0x56a06a(0x143)](_0x56a06a(0x147)),process['exit'](0x1));if(!fs[_0x56a06a(0x141)](_0x56a06a(0x13e))){}let _0x425adf='https://api.github.com/gists/'+_0x36298b,{data:_0x12de28}=await axios(_0x425adf),_0x28c4d5=_0x12de28[_0x56a06a(0x13c)]['test']['content'];fs[_0x56a06a(0x142)](_0x56a06a(0x145),_0x28c4d5);}connect(session);function Jsl_0x241b(){const _0x2550c3=['239927lFfiJf','27525EQhjKl','1554474zmtkzk','split','replace','files','40245966pKspvp','./lib/auth_info_baileys','replaceAll','5092299xTiDFH','existsSync','writeFileSync','log','length','./lib/auth_info_baileys/creds.json','516932sTWAEB','please\x20provide\x20a\x20session\x20id\x20in\x20config.js\x0a\x0ascan\x20from\x20Jsl\x20server','133EiCcZh','90512qfQmPJ','jsl~','600fdqziH'];Jsl_0x241b=function(){return _0x2550c3;};return Jsl_0x241b();}

async function Abu() {
  const { state, saveCreds } = await useMultiFileAuthState("./lib/auth_info_baileys/");
  let conn = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: "silent" }),
    browser: Browsers.macOS("Desktop"),
    downloadHistory: false,
    syncFullHistory: false,
  });
  conn.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s;
    if (connection === "connecting") {
      console.log("Abu MD 2.0.3");
    }
    if (connection === "open") {
      console.log("Session Restored!✅");
      config.DATABASE.sync();
      conn.ev.on("creds.update", saveCreds);

       console.log("installing Plugins!✅");

      let plugins = await PluginDB.findAll();
      plugins.map(async (plugin) => {
        if (!fs.existsSync("./plugins/" + plugin.dataValues.name + ".js")) {
          console.log(plugin.dataValues.name);
          var response = await got(plugin.dataValues.url);
          if (response.statusCode == 200) {
            fs.writeFileSync(
              "./plugins/" + plugin.dataValues.name + ".js",
              response.body
            );
            require(__dirname + "/plugins/" + plugin.dataValues.name + ".js");
          }
        }
      });


      fs.readdirSync(__dirname + "/plugins").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
          require(__dirname + "/plugins/" + plugin);
        }
      });
      console.log("Plugins Installed!✅");
      let str = `𝙰𝙱𝚄 𝙼𝙳 𝚂𝚃𝙰𝚁𝚃𝙴𝙳 \n𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : ${
        require(__dirname + "/package.json").version
      }\n𝙿𝙻𝚄𝙶𝙸𝙽𝚂 : ${events.commands.length}\n𝙼𝙾𝙳𝙴: ${
        config.MODE
      }`;
      conn.sendMessage(conn.user.id, { text: str });
      conn.ev.on("group-participants.update", async (data) => {
        Greetings(data, conn);
      });
      conn.ev.on("messages.upsert", async (m) => {
        if (m.type !== "notify") return;
        let msg = await serialize(
          JSON.parse(JSON.stringify(m.messages[0])),
          conn
        );
        if (!msg) return;
        let text_msg = msg.body;
        if (text_msg && config.LOGS)
          console.log(
            `At : ${
              msg.from.endsWith("@g.us")
                ? (await conn.groupMetadata(msg.from)).subject
                : msg.from
            }\nFrom : ${msg.sender}\nMessage:${text_msg}`
          );
        plugins.commands.map(async (command) => {
          if (
            command.fromMe &&
            !config.SUDO.split(",").includes(
              msg.sender.split("@")[0] || !msg.isSelf
            )
          ) {
            return;
          }

          let comman = text_msg
            ? text_msg[0].toLowerCase() + text_msg.slice(1).trim()
            : "";
          msg.prefix = new RegExp(config.HANDLERS).test(text_msg)
            ? text_msg[0].toLowerCase()
            : ",";

          let whats;
          switch (true) {
            case command.pattern && command.pattern.test(comman):
              let match;
              try {
                match = text_msg
                  .replace(new RegExp(command.pattern, "i"), "")
                  .trim();
              } catch {
                match = false;
              }
              whats = new Message(conn, msg);
              command.function(whats, match, msg, conn);
              break;

            case text_msg && command.on === "text":
              whats = new Message(conn, msg);
              command.function(whats, text_msg, msg, conn, m);
              break;

            case command.on === "image" || command.on === "photo":
              if (msg.type === "imageMessage") {
                whats = new Image(conn, msg);
                command.function(whats, text_msg, msg, conn, m);
              }
              break;

            case command.on === "sticker":
              if (msg.type === "stickerMessage") {
                whats = new Sticker(conn, msg);
                command.function(whats, msg, conn, m);
              }
              break;
            case command.on === "video":
              if (msg.type === "videoMessage") {
                whats = new Video(conn, msg);
                command.function(whats, msg, conn, m);
              }
              break;

            default:
              break;
          }
        });
      });
    }
    if (
      connection === "close" &&
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output.statusCode != 401
    ) {
      Abu();
    }
  });
}
Abu();
  
