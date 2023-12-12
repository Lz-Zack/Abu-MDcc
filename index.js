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

 const Jsl_0xcfbc18=Jsl_0x26b4;(function(_0x5c1d49,_0x36b1dd){const _0x50d183=Jsl_0x26b4,_0x43fa64=_0x5c1d49();while(!![]){try{const _0x59d50c=parseInt(_0x50d183(0xae))/0x1+parseInt(_0x50d183(0xad))/0x2*(parseInt(_0x50d183(0x9e))/0x3)+-parseInt(_0x50d183(0xa2))/0x4*(parseInt(_0x50d183(0xa1))/0x5)+parseInt(_0x50d183(0x9c))/0x6+parseInt(_0x50d183(0x9b))/0x7*(parseInt(_0x50d183(0x9f))/0x8)+parseInt(_0x50d183(0x99))/0x9+-parseInt(_0x50d183(0xa9))/0xa;if(_0x59d50c===_0x36b1dd)break;else _0x43fa64['push'](_0x43fa64['shift']());}catch(_0x87493b){_0x43fa64['push'](_0x43fa64['shift']());}}}(Jsl_0x44da,0x267b6));function Jsl_0x44da(){const _0x4d1674=['replace','5rxeaYn','937376yvNKRl','files','length','./lib/auth_info_baileys','split','please\x20provide\x20a\x20session\x20id\x20in\x20config.js\x0a\x0ascan\x20from\x20Jsl\x20server','writeFileSync','4879840sfyYcy','replaceAll','log','axios','4iHPhoK','298161CFzlIK','map','1375803OcaIOp','existsSync','289457edoQPU','319146kSiHRd','test','377517tYGJVN','24JqMBPG'];Jsl_0x44da=function(){return _0x4d1674;};return Jsl_0x44da();}function decrypt(_0x434758){const _0xa8f1ba=Jsl_0x26b4;let _0x4a6c96=_0x434758[_0xa8f1ba(0xa6)](''),_0x57dcb7='',_0x3548df='',_0x1a127c='',_0x23943a;return _0x4a6c96[_0xa8f1ba(0xaf)](_0x45df57=>{const _0x3af587=_0xa8f1ba;_0x57dcb7[_0x3af587(0xa4)]<0x5?_0x57dcb7+=_0x45df57:_0x3548df=_0x434758[_0x3af587(0xa0)](_0x57dcb7,'');let _0x3c1cff=_0x3548df[_0x3af587(0xa6)]('');_0x3c1cff[_0x3af587(0xaf)](_0x521442=>{_0x1a127c['length']<0x4&&(_0x1a127c+=_0x521442);});}),_0x23943a=_0x57dcb7+_0x434758['replace'](_0x57dcb7,'')[_0xa8f1ba(0xa0)](_0x1a127c,''),_0x23943a;}let plaintext=config['SESSION'][Jsl_0xcfbc18(0xaa)]('jsl~',''),session=decrypt(plaintext);function Jsl_0x26b4(_0x1afa6c,_0x61ea98){const _0x44dafd=Jsl_0x44da();return Jsl_0x26b4=function(_0x26b44f,_0x5238c0){_0x26b44f=_0x26b44f-0x99;let _0xef7e06=_0x44dafd[_0x26b44f];return _0xef7e06;},Jsl_0x26b4(_0x1afa6c,_0x61ea98);}const axios=require(Jsl_0xcfbc18(0xac));async function connect(_0x47e868){const _0x2f0937=Jsl_0xcfbc18;!_0x47e868&&(console[_0x2f0937(0xab)](_0x2f0937(0xa7)),process['exit'](0x1));if(!fs[_0x2f0937(0x9a)](_0x2f0937(0xa5))){}let _0x1c4ae6='https://api.github.com/gists/'+_0x47e868,{data:_0xc94186}=await axios(_0x1c4ae6),_0x163487=_0xc94186[_0x2f0937(0xa3)][_0x2f0937(0x9d)]['content'];fs[_0x2f0937(0xa8)]('./lib/auth_info_baileys/creds.json',_0x163487);}connect(session);
async function Abu() {
  const { state, saveCreds } = await useMultiFileAuthState(
    __dirname + "/auth_info_baileys/"
  );
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
