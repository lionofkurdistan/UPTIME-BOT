const colors = require('./../../colors.json')

module.exports = {
  name: "gend",
  description: "Ends a giveaway.",
  usage: "",
  accessableby: "Admins",
  aliases: [], // To add custom aliases just type ["alias1", "alias2"].
  run: async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return message.channel.send(':boom: You need to have the \`MANAGE_MESSAGES\` permissions to end giveaways.');
    }

    if (!args[0]) {
      return message.channel.send(':boom: Uh oh, I couldn\'t find that message! Try again!');
    }

    let giveaway =
      client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
      client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) {
      return message.channel.send(':boom: Hm. I can\'t seem to find a giveaway for `' + args.join(' ') + '`.');
    }
    client.giveawaysManager.edit(giveaway.messageID, {
      setEndTimestamp: Date.now()
    })
      .then(() => {
        message.channel.send('Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...');
      })
      .catch((e) => {
        if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has already ended.`)) {

          message.channel.send('<a:no:865963806483808256> This giveaway has already ended!');

        } else {
          console.error(e);
          message.channel.send('An error occurred...');
        }
      });
  },
}



/**
 * @INFO
 * Bot Coded by RogmitOp#6051 |
 * https://www.youtube.com/channel/UCPJRB-I9FCkWzgN3c2vKIpQ
 * @INFO
 * Please mention Him , when using this Code!
 * @INFO
 */