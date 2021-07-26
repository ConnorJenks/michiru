const Canvas = require('canvas')
const fetch = require('node-fetch')
const { Image } = require('canvas')

module.exports = async (Discord, client, member) => {
    if(member.guild.id === "848707853350862858"){
        let uid = member.id
        let receive = ''
        var banner = 'https://cdn.discordapp.com/attachments/853961222520045598/869206134551089172/welcome-image.jpg'// invisible image ( you can change the link if you want )
        let statut = ''

        await fetch(`https://discord.com/api/v8/users/${uid}`, {
            
        method: 'GET',
            headers: {
                Authorization: `Bot ${client.token}`
            }
        
        }).then(async a => {
            if(a.status !== 404) {
                a.json().then(async data => {
                    receive = data['banner']

                    if(receive !== null) {

                        let response2 = await fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                            method: 'GET',
                            headers: {
                                Authorization: `Bot ${client.token}`
                            }
                        }).then(async b => {
                            statut = b.status

                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                            if(statut === 415) {
                                banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                            }

                        })
                    }
                })
            }
        })

        setTimeout(async () => {

            const channel = await member.guild.channels.cache.find(ch => ch.id === "853961163104976917")

            var background = new Image();
            await new Promise(r => background.onload=r, background.src=banner)
            
            const canvas = Canvas.createCanvas(1024, 410)
            
            const ctx = canvas.getContext('2d')

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 5
            ctx.strokeRect(0, 0, canvas.width, canvas.height)

            ctx.textAlign = 'center'

            ctx.font = '36px sans-serif'
            ctx.fillStyle = '000000'
            ctx.fillText(`Welcome to the server!`, canvas.width / 2, canvas.height / 8 - 25, 600)

            ctx.font = '48px sans-serif'
            ctx.fillText(
                `${member.displayName}!`,
                canvas.width / 2,
                canvas.height / 8 + 48 - 25,
                600
            )

            left = (canvas.width - 300) / 2
            top = (canvas.height - 300) / 2 + 25

            ctx.beginPath()
            ctx.arc(left + 150, top + 150, 150, 0, Math.PI * 2, true)
            ctx.closePath()
            ctx.clip()

            const avatar = await Canvas.loadImage(
                member.user.displayAvatarURL({format: 'png'})
            )


            ctx.drawImage(avatar, left, top, 300, 300)

            const attachment = new Discord.MessageAttachment(
                canvas.toBuffer(),
                'weclome-image.png'
            )

            message = channel.send(`Welcome to the server, ${member}`, attachment)
            console.log(avatar.width, avatar.height)
        }, 1000)
    }
}
