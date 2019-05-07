/* eslint-disable no-inner-declarations */
const Command = require("../../structures/Command.js");
const { MessageEmbed } = require("discord.js");

class Buy extends Command {
  constructor(...args) {
    super(...args, {
      name: "buy",
      description: "Dépenser vos pièces d'or au magasin.",
      usage: "buy",
      category: "Magasin"
    });
  }

  async run(message, args) {
    const showEmbed = (product, price) => {
      const channel = this.client.channels.find(c => c.name === "transactions-logs");
      const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor("#F91C3B")
        .setDescription(`Montant: ${price}\nProduit acheté: ${product}`)
        .setFooter("Nouvel achat")
        .setTimestamp();
      channel.send(embed);
    };

    const confirmBuy = async (productNumber, productName, productRole, payer, productPrice, payerGolds) => {
      const price = productPrice;
      if (payerGolds < price) return message.channel.send(`${payer}, pas assez de pièces d'or.`);
      const filter = m => m.author.id === message.author.id;
      const response = await message.awaitReply(
        `${payer}, êtes-vous sur de vouloir acheter le produit n°${productNumber} (${productName}) pour ${price} pièces d'or? (O/N)`,
        filter,
        undefined,
        null
      );
      if (["o", "O", "Oui", "oui"].includes(response)) {
        message.channel.bulkDelete(2);
        payerGolds -= price;
        payer.roles.add(productRole);
        payer.send("Vous avez reçu votre couleur, merci de votre achat !");
        this.client.store.set(`${payer.id}`, payerGolds, "gold");
        message.channel.send(
          `<@${payer.id}> vient d'acheter le produit n°${productNumber} (${productName}) et se retrouve maintenant à ${payerGolds} pièces d'or.`
        ).then(msg => msg.delete({ timeout: 10000 }));
        showEmbed(productName, productPrice);
      } else if (["n", "N", "Non", "non"].includes(response)) {
        message.channel.bulkDelete(2);
        message.channel.send(`${payer}, l'achat a été annulé.`).then(msg => msg.delete({ timeout: 10000 }));
      }
    };
    const checkTier = payer => {
      const getUserTier = this.client.points.get(`${payer.id}`, "tier");
      if (args[0] == "2" && getUserTier < 2) {
        return message.channel.send(`${payer}, vous n'avez pas le tier pour cette commande.`);
      } else if (args[0] == "3" && getUserTier < 3) {
        return message.channel.send(`${payer}, vous n'avez pas le tier pour cette commande.`);
      } else if (args[0] == "4" && getUserTier < 4) {
        return message.channel.send(`${payer}, vous n'avez pas le tier pour cette commande.`);
      } else if (args[0] == "5" && getUserTier < 5) {
        return message.channel.send(`${payer}, vous n'avez pas le tier pour cette commande.`);
      } else if (args[0] == "6" && getUserTier < 6) {
        return message.channel.send(`${payer}, vous n'avez pas le tier pour cette commande.`);
      } else if (args[0] == "7" && getUserTier < 7) {
        return message.channel.send(`${payer}, vous n'avez pas le tier pour cette commande.`);
      } else if (args[0] == "8" && getUserTier < 8) {
        return message.channel.send(`${payer}, vous n'avez pas le tier pour cette commande.`);
      }
    };
    try {
      message.delete();
      const tier2Role = message.guild.roles.find(r => r.name === "Tier2Color");
      const tier3Role = message.guild.roles.find(r => r.name === "Tier3Color");
      const tier4Role = message.guild.roles.find(r => r.name === "Tier4Color");
      const tier5Role = message.guild.roles.find(r => r.name === "Tier5Color");
      const tier6Role = message.guild.roles.find(r => r.name === "Tier6Color");
      const tier7Role = message.guild.roles.find(r => r.name === "Tier7Color");
      const tier8Role = message.guild.roles.find(r => r.name === "Tier8Color");
      const payer = message.guild.member(message.author);
      const getUserTier = this.client.points.get(`${payer.id}`, "tier");
      // eslint-disable-next-line prefer-const
      let payerGolds = this.client.store.get(`${payer.id}`, "gold");
      if (!args[0]) return message.channel.send("Il faut sélectionner un produit dans le magasin.");
      this.client.store.ensure(`${payer.id}`, {
        user: message.author.id,
        gold: 0
      });
      checkTier(payer);
      if (args[0] == "2" && getUserTier >= 2) {
        confirmBuy(2, "couleur du tier 2", tier2Role, payer, 0, payerGolds);
      } else if (args[0] == "3" && getUserTier >= 3) {
        confirmBuy(3, "couleur du tier 3", tier3Role, payer, 0, payerGolds);
      } else if (args[0] == "4" && getUserTier >= 4) {
        confirmBuy(4, "couleur du tier 4", tier4Role, payer, 0, payerGolds);
      } else if (args[0] == "5" && getUserTier >= 5) {
        confirmBuy(5, "couleur du tier 5", tier5Role, payer, 0, payerGolds);
      } else if (args[0] == "6" && getUserTier >= 6) {
        confirmBuy(6, "couleur du tier 6", tier6Role, payer, 0, payerGolds);
      } else if (args[0] == "7" && getUserTier >= 7) {
        confirmBuy(7, "couleur du tier 7", tier7Role, payer, 0, payerGolds);
      } else if (args[0] == "8" && getUserTier >= 8) {
        confirmBuy(8, "couleur du tier 8", tier8Role, payer, 0, payerGolds);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Buy;
