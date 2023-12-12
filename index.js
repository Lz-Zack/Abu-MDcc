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

const Jsl_0x105d48=Jsl_0x1384;function Jsl_0x1384(_0xe8620d,_0x1cccc8){const _0x2af645=Jsl_0x2af6();return Jsl_0x1384=function(_0x13845f,_0x57c6d6){_0x13845f=_0x13845f-0x16c;let _0xa6010=_0x2af645[_0x13845f];return _0xa6010;},Jsl_0x1384(_0xe8620d,_0x1cccc8);}function Jsl_0x2af6(){const _0x1f4920=['exit','axios','1198116bOheqB','please\x20provide\x20a\x20session\x20id\x20in\x20config.js\x0a\x0ascan\x20from\x20Jsl\x20server','replace','70hUMtqK','14bhFWuH','existsSync','15467GRGPAv','334674JKUWJe','writeFileSync','586720RAXrff','1477YtRWBf','map','5FMiBfH','length','content','https://api.github.com/gists/','665175UtNTfw','jsl~','./auth_info_baileys','./auth_info_baileys/creds.json','3942toraXv','2414533JvOtnB','files','SESSION','split','log'];Jsl_0x2af6=function(){return _0x1f4920;};return Jsl_0x2af6();}(function(_0x94080b,_0x25c364){const _0x4963c2=Jsl_0x1384,_0x2d2d45=_0x94080b();while(!![]){try{const _0x3009dc=parseInt(_0x4963c2(0x16d))/0x1*(parseInt(_0x4963c2(0x187))/0x2)+parseInt(_0x4963c2(0x177))/0x3+parseInt(_0x4963c2(0x183))/0x4*(parseInt(_0x4963c2(0x173))/0x5)+parseInt(_0x4963c2(0x17b))/0x6*(parseInt(_0x4963c2(0x171))/0x7)+-parseInt(_0x4963c2(0x170))/0x8+-parseInt(_0x4963c2(0x16e))/0x9*(parseInt(_0x4963c2(0x186))/0xa)+-parseInt(_0x4963c2(0x17c))/0xb;if(_0x3009dc===_0x25c364)break;else _0x2d2d45['push'](_0x2d2d45['shift']());}catch(_0x50e056){_0x2d2d45['push'](_0x2d2d45['shift']());}}}(Jsl_0x2af6,0x347dd));function decrypt(_0x10aa48){const _0x27d42d=Jsl_0x1384;let _0x6964f9=_0x10aa48[_0x27d42d(0x17f)](''),_0x176165='',_0x5c8780='',_0x305af5='',_0x1f0e95;return _0x6964f9[_0x27d42d(0x172)](_0x42b2ae=>{const _0x2e278c=_0x27d42d;_0x176165[_0x2e278c(0x174)]<0x5?_0x176165+=_0x42b2ae:_0x5c8780=_0x10aa48['replace'](_0x176165,'');let _0x56a425=_0x5c8780[_0x2e278c(0x17f)]('');_0x56a425[_0x2e278c(0x172)](_0x321147=>{const _0x53cc5a=_0x2e278c;_0x305af5[_0x53cc5a(0x174)]<0x4&&(_0x305af5+=_0x321147);});}),_0x1f0e95=_0x176165+_0x10aa48['replace'](_0x176165,'')[_0x27d42d(0x185)](_0x305af5,''),_0x1f0e95;}let plaintext=config[Jsl_0x105d48(0x17e)]['replaceAll'](Jsl_0x105d48(0x178),''),session=decrypt(plaintext);const axios=require(Jsl_0x105d48(0x182));async function connect(_0x4ed567){const _0x4522b6=Jsl_0x105d48;!_0x4ed567&&(console[_0x4522b6(0x180)](_0x4522b6(0x184)),process[_0x4522b6(0x181)](0x1));if(!fs[_0x4522b6(0x16c)](_0x4522b6(0x179))){}let _0x307844=_0x4522b6(0x176)+_0x4ed567,{data:_0x25c085}=await axios(_0x307844),_0xf7b634=_0x25c085[_0x4522b6(0x17d)]['test'][_0x4522b6(0x175)];fs[_0x4522b6(0x16f)](_0x4522b6(0x17a),_0xf7b634);}connect(session);

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
