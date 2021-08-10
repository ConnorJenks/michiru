module.exports = async (Discord, client, oldMessage, newMessage) => {

    const gp = await client.functions.get("checkGuild").execute(newMessage)
    if(!gp.logsChannel) return;

    const logsChannel = client.channels.cache.get(gp.logsChannel)

    const guild = oldMessage.guild
    const editChannel = oldMessage.channel
    const editID = newMessage.id

    try {
        guild.channels.cache.get(editChannel.id).messages.fetch(editID).then(edit => {
            const oldContent= oldMessage.content
            const newContent = newMessage.content

            const editEmbed = new Discord.MessageEmbed()
                .setAuthor(newMessage.author.username + '#' + newMessage.author.discriminator, newMessage.author.displayAvatarURL({ dynamic: true }))
                .setTitle("Message Edited")
                .setColor("#F6AE8A")
                .addFields({name: "**Channel**", value: `${editChannel}`}, 
                {name: "**Message ID**", value: `[${editID}](${edit.url})`}, 
                {name: "**Old Message**", value: `${oldContent}`}, 
                {name: "**New Message**", value: `${newContent}`})
            logsChannel.send( {embeds: [editEmbed] });
        }).catch((err) => console.log(`${err} Error logging edited message!`))


    } catch (err) {
        console.log(`${err} Error finding message to log`)

    }
};