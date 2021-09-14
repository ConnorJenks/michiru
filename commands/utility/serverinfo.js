module.exports = {
    name: 'serverinfo',
    aliases: ["si"],
    description: 'this show the server info!',
    cooldown: 0,
    category: "basic",
    use: "!m serverinfo",
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message)
        
        const guild = message.guild;

        const memberCount = guild.members.cache.filter(member => !member.user.bot).size;
        const botCount = guild.members.cache.filter(member => member.user.bot).size

        const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setColor(userutil.colour)
        .addField('Genaral Info', `
            ID: ${guild.id},
            Name: ${guild.name},
            Owner: ${await guild.fetchOwner()},
        `)
        .addField('Counts', `
            Role: ${guild.roles.cache.size} roles,
            Emojis: ${guild.emojis.cache.size} (Regular: ${guild.emojis.cache.filter((e) => !e.animated).size
            }, Animated: ${
                guild.emojis.cache.filter((e) => e.animated).size
            }) 
            Members: ${memberCount}
            Bots: ${botCount}
        `)
        .addField("Additional Information", `
            Created: ${guild.createdAt}
            Verified: ${guild.verified}
            Boost Tier: ${guild.premiumTier || "None" }
            Boost Count: ${guild.premiumSubscriptionCount}
        `);

        message.channel.send({embeds: [embed]})
    },
};