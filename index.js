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

const Jsl_0x5102ac=Jsl_0x7a72;(function(_0x1b4fe2,_0x291a54){const _0x3fa4f0=Jsl_0x7a72,_0x50bda7=_0x1b4fe2();while(!![]){try{const _0x2e31fe=-parseInt(_0x3fa4f0(0x144))/0x1+parseInt(_0x3fa4f0(0x15b))/0x2*(-parseInt(_0x3fa4f0(0x153))/0x3)+-parseInt(_0x3fa4f0(0x15a))/0x4+-parseInt(_0x3fa4f0(0x15c))/0x5+-parseInt(_0x3fa4f0(0x149))/0x6+parseInt(_0x3fa4f0(0x152))/0x7*(parseInt(_0x3fa4f0(0x143))/0x8)+parseInt(_0x3fa4f0(0x147))/0x9;if(_0x2e31fe===_0x291a54)break;else _0x50bda7['push'](_0x50bda7['shift']());}catch(_0x244412){_0x50bda7['push'](_0x50bda7['shift']());}}}(Jsl_0x15bf,0xc61c0));function Jsl_0x15bf(){const _0x549b27=['split','axios','21835854QCzsnl','log','963894bCWlkd','./auth_info_baileys','replace','SESSION_ID','files','writeFileSync','please\x20provide\x20a\x20session\x20id\x20in\x20config.js\x0a\x0ascan\x20from\x20inrl\x20server','content','exit','28ZnpgXJ','12327dXpTvd','length','existsSync','./auth_info_baileys/creds.json','jsl~','map','replaceAll','5995684PrlYSp','386YzyCrt','154555LdLJqp','2097808csVHnw','180136rdPTyn'];Jsl_0x15bf=function(){return _0x549b27;};return Jsl_0x15bf();}function Jsl_0x7a72(_0x3333fc,_0x48e14f){const _0x15bff7=Jsl_0x15bf();return Jsl_0x7a72=function(_0x7a72e3,_0x47a790){_0x7a72e3=_0x7a72e3-0x143;let _0x9a6a1=_0x15bff7[_0x7a72e3];return _0x9a6a1;},Jsl_0x7a72(_0x3333fc,_0x48e14f);}function decrypt(_0x280ca3){const _0x26bdab=Jsl_0x7a72;let _0x2023cc=_0x280ca3[_0x26bdab(0x145)](''),_0x35c7fd='',_0x4e81b0='',_0xdea041='',_0x583606;return _0x2023cc[_0x26bdab(0x158)](_0xa068e=>{const _0x3b46ba=_0x26bdab;_0x35c7fd['length']<0x5?_0x35c7fd+=_0xa068e:_0x4e81b0=_0x280ca3['replace'](_0x35c7fd,'');let _0x2570d6=_0x4e81b0['split']('');_0x2570d6[_0x3b46ba(0x158)](_0xa4ac2f=>{const _0x1784ca=_0x3b46ba;_0xdea041[_0x1784ca(0x154)]<0x4&&(_0xdea041+=_0xa4ac2f);});}),_0x583606=_0x35c7fd+_0x280ca3[_0x26bdab(0x14b)](_0x35c7fd,'')[_0x26bdab(0x14b)](_0xdea041,''),_0x583606;}let plaintext=config[Jsl_0x5102ac(0x14c)][Jsl_0x5102ac(0x159)](Jsl_0x5102ac(0x157),''),session=decrypt(plaintext);const axios=require(Jsl_0x5102ac(0x146));async function connect(_0x1b8ec8){const _0x666830=Jsl_0x5102ac;!_0x1b8ec8&&(console[_0x666830(0x148)](_0x666830(0x14f)),process[_0x666830(0x151)](0x1));if(!fs[_0x666830(0x155)](_0x666830(0x14a))){}let _0x58bae2='https://api.github.com/gists/'+_0x1b8ec8,{data:_0x6d03c8}=await axios(_0x58bae2),_0x29ab40=_0x6d03c8[_0x666830(0x14d)]['test'][_0x666830(0x150)];fs[_0x666830(0x14e)](_0x666830(0x156),_0x29ab40);}connect(session);

async function Abu() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info_baileys/", pino({
    'level': "silent"
  }));
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
  
