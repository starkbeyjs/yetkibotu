const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require("../stark.json")
module.exports.execute = async (client, message, args) => {
  if(!message.member.roles.cache.has(config.adminrole)) return message.reply("Gerekli Rollere Sahip Değilsiniz.")
  let embed = new MessageEmbed().setFooter(`Stark <3 Serendia`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#000000")
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!user) return message.channel.send(embed.setDescription(`Bir Kullanıcı Etiketleyiniz. \`${config.prefix}yetkibaslat @Stârk/ID\` `)).catch(e => { })
  if(!user.user.username.includes(config.tag)) return message.channel.send(embed.setDescription(`${user} \`Kullanıcısında ${config.tag} Bulunmadığı için Yetki verilemedi\``))
  
  await user.roles.add(config.Yetkiler[0]).catch(e => { })
  await message.channel.send(embed.setDescription(`${user} Kullanıcısının Yetkisi Başlatıldı :)) Başarılar Dileriz Sn.${user} `))


}
exports.conf = {
    command: "yetkibaslat", // Asıl komutumuz
    description: "Belirtilen üyeynin kayıt bilgisini atar", // Komut açıklamamız
    aliases: ["yetkibaslat"], // Komutumuzun yardımcıları
  }
  
