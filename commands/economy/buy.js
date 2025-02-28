const Discord = require("discord.js");
const userEcon = require("../../models/userEcon");
module.exports = {
  name: "buy",
  gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/buy.js",
  category: "eco",
  use: "buy <category> <item>",
  example: "!m buy pickaxes steel pickaxe",
  description: "buy items from the shop.",
  cooldown: 5,
  minArgs: 2,
  maxArgs: 3,
  async execute(client, message, args, Discord) {
    const categories = {
      pickaxes: {
        steelpickaxe: {
          emoji: "<:SteelPickaxe:914215803971309618>",
          rank: 2,
          cost: 1000,
        },
        magnitepickaxe: {
          emoji: "<:MagnitePickaxe:914215849227866135> ",
          rank: 3,
          cost: 5000,
        },
        elgiloypickaxe: {
          emoji: "<:ElgiloyPickaxe:914215888742383727> ",
          rank: 4,
          cost: 10000,
        },
        shakudopickaxe: {
          emoji: "<:ShakudoPickaxe:914215943335477309>",
          rank: 5,
          cost: 25000,
        },
        stellitepickaxe: {
          emoji: "<:StellitePickaxe:914216018635796520> ",
          rank: 6,
          cost: 50000,
        },
        cobiumpickaxe: {
          emoji: "<:CobiumPickaxe:914216084482170891> ",
          rank: 7,
          cost: 100000,
        },
        dymalloypickaxe: {
          emoji: "<:DymalloyPickaxe:914216124093186108> ",
          rank: 8,
          cost: 250000,
        },
        vitalliumpickaxe: {
          emoji: "<:VitalliumPickaxe:914216162777264138>",
          rank: 9,
          cost: 500000,
        },
      },
    };
    
    //check for one word items
    if (!args[3]) args[3] = "";
    //pickaxe alias for item
    if (args[3] === "pick") {
      args[3] = "pickaxe";
    } else {
      args[3] = args[3];
    }
    //create the query from args
    const query = `${args[2]}${args[3]}`;
    //check for category
    if (!args[1])
      return message.reply(
        "Include which category of item you want to buy \`pickaxes\` *more categories coming soon*"
      );
    //pickaxe aliases for category
    let category;
    if (args[1] === "picks" || args[1] === "pick" || args[1] === "pickaxe") {
      category = "pickaxes";
    } else {
      category = args[1];
    }
    //make sure they include an item to purchase
    if (!args[2]) return message.reply("Include what you want to buy!");
    //verify category exists
    if (!categories[category])
      return message.reply("That category doesnt exist!");
    //verify item exists in category
    if (!categories[category][query])
      return message.reply("That item doesnt exist!");
    //set request to item from category
    const request = categories[category][query];
    const userecon = await client.functions.get("getUserEcon").execute(message.member);
    const userutil = await client.functions.get("getUserUtil").execute(message.member)
    if (request.rank <= userecon.pick) return message.reply("Your pickaxe is already the same or better!")
    if (userecon.coins - request.cost < 0) return message.reply("You can't afford this pickaxe yet!")
    const newBal = userecon.coins - request.cost
    await userEcon.findOneAndUpdate(
      {
          userID: message.member.user.id
      },
      {
          $set:{
              pick: request.rank,
              coins: newBal
          }
      }
  )
  const embed = new Discord.MessageEmbed()
    .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
    .setTitle(`${message.member.user.username}'s Purchase!`)
    .setDescription(`**Purchase:** ${request.emoji} ${args[2]} ${args[3]}\n**Cost:** ${request.cost} coins\n**New Balance:** ${newBal}`)
    .setColor(userutil.colour)
    .setTimestamp()
    .setFooter("💸", client.user.displayAvatarURL())

  message.reply({embeds: [embed]})
  },
};
