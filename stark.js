const Discord = require("discord.js");
const { MessageEmbed, WebhookClient, MessageAttachment } = require('discord.js');
const _client = new Discord.Client({ fetchAllMembers: true });
const client = global.client = _client
let config = require("./stark.json");
global.client = client;
const fs = require("fs");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdirSync("./Komutlar/").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./Komutlar/${file}`);
    client.commands.set(command.conf.command, command);
    console.log(`[RegisterCommands] ${file.replace(".js", "")} Komut Yüklendi.`);
    command.conf.aliases.forEach(aliases => {
    client.aliases.set(aliases, command)  
  })
});

fs.readdirSync("./Eventler").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./Eventler/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[RegisterEvent] ${file.replace(".js", "")} Event Yüklendi.`);
});

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: config.durum }, status: "dnd" });
});    

client.login(config.token).then(x => console.log(`[Stark] - Bot  olarak giriş yaptı!`)).catch(err => console.error(`[Stark] - Bot giriş yapamadı | Hata: ${err}`));
