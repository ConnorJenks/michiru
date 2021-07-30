const Discord = require("discord.js")

module.exports = {
    name: "target",
    aliases: ['goal'],
    use: "!m target",
    category: "basic",
    description: "allows people to see the current progress/publicity of the bot",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        var number = client.guilds.cache.size
        var embed = new Discord.MessageEmbed()
            .setTitle("Lets get to 100 guilds!")
            .setDescription(`currently at ${number} out of 100`)
            .setColor(util.get(`${message.author.id}.colour`))
        message.channel.send({embeds: [embed]})
    }
}