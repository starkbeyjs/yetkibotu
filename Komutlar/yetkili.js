const {MessageEmbed} = require('discord.js')
const config = require("../stark.json");
module.exports.execute = async (client, message, args) => {
    if(!message.member.roles.cache.has(config.adminrole)) return message.reply("Gerekli Rollere Sahip Değilsiniz.")
    let embed = new MessageEmbed().setFooter(`Stark <3 Serendia`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#000000")
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(embed.setDescription(`Bir Kullanıcı Etiketleyiniz. \`${config.prefix}yetkili @Stârk/ID yükselt veya ${config.prefix}yetkili @Stârk/ID düşür\` `)).catch(e => { })
    let yd = args[1];
    if(!yd) return message.channel.send(`Bir veri belirtiniz \`${config.prefix}yetkili @Stârk/ID yükselt veya ${config.prefix}yetkili @Stârk/ID düşür\` `).catch(e => { })
    if(yd === "yükselt") {
      let yetkiNumber;
      let sahipOlunanRol = Number();
      for (yetkiNumber = 0; yetkiNumber < config.Yetkiler.length ; yetkiNumber++) {
        if(user.roles.cache.has(config.Yetkiler[yetkiNumber])) {
          sahipOlunanRol += yetkiNumber
        };
      }  
   if(!user.roles.cache.has(config.Yetkiler[config.Yetkiler.length-1])){
      await user.roles.add(config.Yetkiler[sahipOlunanRol+1]).catch(e => { })
      await user.roles.remove(config.Yetkiler[sahipOlunanRol]).catch(e => { })
      await message.channel.send(embed.setDescription(`${user} Kullanısı <@&${config.Yetkiler[sahipOlunanRol+1]}> Yetkisine Başarılı bir Şekilde Yükseltildi.`)).catch(e => { })
    } else { message.channel.send(embed.setDescription(`:x: Belirtilen Kullanıcı Zaten Max Role Sahip.`)).catch(e => { }) }
  }

  if(yd === "düşür") {
    let yetkiNumber;
    let sahipOlunanRol = Number();
    for (yetkiNumber = 0; yetkiNumber < config.Yetkiler.length ; yetkiNumber++) {
      if(user.roles.cache.has(config.Yetkiler[yetkiNumber])) {
        sahipOlunanRol += yetkiNumber
      };
    }  
    if(!user.roles.cache.has(config.Yetkiler[0])){
    await user.roles.add(config.Yetkiler[sahipOlunanRol-1]).catch(e => { })
    await user.roles.remove(config.Yetkiler[sahipOlunanRol]).catch(e => { })
    await message.channel.send(embed.setDescription(`${user} Kullanısı <@&${config.Yetkiler[sahipOlunanRol-1]}> Yetkisine Başarılı bir Şekilde Düşürüldü.`)).catch(e => { })
  } else {
    message.channel.send(embed.setDescription(`:x: Belirtilen yetkili zaten en alt yetkide. Yetkisini almak istermisiniz? ?`)).then(async msj => {
    await msj.react('✅');
   const kabul = (reaction, user) => {
    return ['✅'].includes(reaction.emoji.name) && user.id === message.author.id;
  };
msj.awaitReactions(kabul, {max: 1, time: 50000, error: ['time']}).then(async c => {
  let cevap = c.first();
  if (cevap) {
  if(user.roles.cache.has(config.erkekrol)) await user.roles.set([config.erkekrol]).catch(e => { })
  if(user.roles.cache.has(config.kadınrol)) await user.roles.set([config.kadınrol]).catch(e => { })
  if(user.user.username.includes(config.tag)) await user.roles.add(config.taglırol).catch(e => { })
   await msj.delete().catch(e => { });
} }) });
} }
 }
 exports.conf = {
    command: "Yetkili", // Asıl komutumuz
    description: "Belirtilen üyeynin kayıt bilgisini atar", // Komut açıklamamız
    aliases: ["yetkili"], // Komutumuzun yardımcıları
  }
  