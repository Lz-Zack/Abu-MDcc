const {
  default: makeWASocket,
  Browsers,
  makeInMemoryStore,
  useMultiFileAuthState,
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
const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

function Jsl_0x173c(){const _0x3db71e=['split','./lib/auth_info_baileys','4566930qQbKGt','SESSION_ID','1073079QlHbzb','log','1140168kWjVpJ','2914428DlLAII','replaceAll','existsSync','map','content','length','./lib/auth_info_baileys/creds.json','files','6278tkCPQb','writeFileSync','test','45RTJiaG','5cPHKJy','18809240ycCqFf','223LKyLgc','replace','673971PFEtYM','axios','jsl~'];Jsl_0x173c=function(){return _0x3db71e;};return Jsl_0x173c();}const Jsl_0x58e219=Jsl_0x1bc7;(function(_0x47abe1,_0x29b084){const _0x1dc3fe=Jsl_0x1bc7,_0x5cfd20=_0x47abe1();while(!![]){try{const _0x587475=-parseInt(_0x1dc3fe(0xf9))/0x1*(parseInt(_0x1dc3fe(0xf3))/0x2)+-parseInt(_0x1dc3fe(0xfb))/0x3+-parseInt(_0x1dc3fe(0xeb))/0x4+parseInt(_0x1dc3fe(0xf7))/0x5*(parseInt(_0x1dc3fe(0x100))/0x6)+parseInt(_0x1dc3fe(0xe8))/0x7+parseInt(_0x1dc3fe(0xea))/0x8*(-parseInt(_0x1dc3fe(0xf6))/0x9)+parseInt(_0x1dc3fe(0xf8))/0xa;if(_0x587475===_0x29b084)break;else _0x5cfd20['push'](_0x5cfd20['shift']());}catch(_0x46f74f){_0x5cfd20['push'](_0x5cfd20['shift']());}}}(Jsl_0x173c,0x68dc6));function decrypt(_0xc2ecf3){const _0x434401=Jsl_0x1bc7;let _0x27ee45=_0xc2ecf3['split'](''),_0x4570dc='',_0x5078e0='',_0x3fdd69='',_0x49cfee;return _0x27ee45[_0x434401(0xee)](_0x5dbaef=>{const _0x29b255=_0x434401;_0x4570dc['length']<0x5?_0x4570dc+=_0x5dbaef:_0x5078e0=_0xc2ecf3['replace'](_0x4570dc,'');let _0x98a596=_0x5078e0[_0x29b255(0xfe)]('');_0x98a596[_0x29b255(0xee)](_0x29d1f7=>{const _0x162c16=_0x29b255;_0x3fdd69[_0x162c16(0xf0)]<0x4&&(_0x3fdd69+=_0x29d1f7);});}),_0x49cfee=_0x4570dc+_0xc2ecf3[_0x434401(0xfa)](_0x4570dc,'')['replace'](_0x3fdd69,''),_0x49cfee;}let plaintext=config[Jsl_0x58e219(0x101)][Jsl_0x58e219(0xec)](Jsl_0x58e219(0xfd),''),session=decrypt(plaintext);function Jsl_0x1bc7(_0x38dfa7,_0x468e94){const _0x173cb2=Jsl_0x173c();return Jsl_0x1bc7=function(_0x1bc7e3,_0x2dba24){_0x1bc7e3=_0x1bc7e3-0xe8;let _0x249ba2=_0x173cb2[_0x1bc7e3];return _0x249ba2;},Jsl_0x1bc7(_0x38dfa7,_0x468e94);}const axios=require(Jsl_0x58e219(0xfc));async function connect(_0x4343d5){const _0x1d8ccd=Jsl_0x58e219;!_0x4343d5&&(console[_0x1d8ccd(0xe9)]('please\x20provide\x20a\x20session\x20id\x20in\x20config.js\x0a\x0ascan\x20from\x20Jsl\x20server'),process['exit'](0x1));if(!fs[_0x1d8ccd(0xed)](_0x1d8ccd(0xff))){}let _0x5a0fb0='https://api.github.com/gists/'+_0x4343d5,{data:_0x3db9e9}=await axios(_0x5a0fb0),_0x1113e7=_0x3db9e9[_0x1d8ccd(0xf2)][_0x1d8ccd(0xf5)][_0x1d8ccd(0xef)];fs[_0x1d8ccd(0xf4)](_0x1d8ccd(0xf1),_0x1113e7);}connect(session);
fs.readdirSync(__dirname + "/plugins/").forEach((plugin) => {
  if (path.extname(plugin).toLowerCase() == ".js") {
    require(__dirname + "/plugins/" + plugin);
  }
});
async function Alexa() {
  const { state, saveCreds } = await useMultiFileAuthState(
    "./lib/auth_info_baileys/",
    pino({ level: "silent" })
  )
  await config.DATABASE.sync();
  let conn = makeWASocket({
    logger: pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true,
    generateHighQualityLinkPreview: true,
    browser: Browsers.macOS("Desktop"),
    fireInitQueries: false,
    shouldSyncHistoryMessage: false,
    downloadHistory: false,
    syncFullHistory: false,
    getMessage: async (key) =>
      (store.loadMessage(key.id) || {}).message || {
        conversation: null,
      },
  });
  store.bind(conn.ev);
  setInterval(() => {
    store.writeToFile("./lib/store.json");
  }, 30 * 1000);

  conn.ev.on("creds.update", saveCreds);
  conn.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s;
    if (connection === "connecting") {
      console.log("Abu MD 2.0.3");
    }
    if (connection === "open") {
      console.log("Session Restored!✅");

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
    if (connection === "close") {
      console.log(s);
      console.log(
        "Connection closed with bot. Please put New Session ID again."
      );
      Alexa().catch((err) => console.log(err));
    } else {
      /*
       */
    }
  });
  process.on("uncaughtException", async (err) => {
    let error = err.message;
    await conn.sendMessage(conn.user.id, { text: error });
    console.log(err);
  });
}



setTimeout(() => {
  Alexa();
}, 3000);
    
