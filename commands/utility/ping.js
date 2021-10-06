const Discord = require("discord.js")

module.exports = {
    name: "ping",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/ping.js",
    description: "shows latencies of the bot",
    category: "basic",
    use: "!m ping",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message)
        message.channel.send('Calculating current ping...').then((resultMessage) => {
        const pingEmbed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setDescription(`🏓 Latency is ${message.createdTimestamp - Date.now()}ms \n⌛ API Latency is ${Math.round(client.ws.ping)}ms\n🆙 Uptime: ${process.uptime().toFixed(2)}`)
            .setFooter("Pong!", client.user.displayAvatarURL())
            .setTimestamp()
            .setColor(userutil.colour)
        
        resultMessage.delete();    
        message.channel.send({embeds: [pingEmbed]})
        })
    }
}