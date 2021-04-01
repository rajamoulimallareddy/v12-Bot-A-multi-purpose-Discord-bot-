const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const translate = require('@k3rn31p4nic/google-translate-api')
const langs = ["afrikaans", "albanian", "amharic", "arabic", "armenian", "azerbaijani", "bangla", "basque", "belarusian", "bengali", "bosnian", "bulgarian", "burmese", "catalan", "cebuano", "chichewa", "corsican", "croatian", "czech", "danish", "dutch", "english", "esperanto", "estonian", "filipino", "finnish", "french", "frisian", "galician", "georgian", "german", "greek", "gujarati", "haitian creole", "hausa", "hawaiian", "hebrew", "hindi", "hmong", "hungarian", "icelandic", "igbo", "indonesian", "irish", "italian", "japanese", "javanese", "kannada", "kazakh", "khmer", "korean", "kurdish (kurmanji)", "kyrgyz", "lao", "latin", "latvian", "lithuanian", "luxembourgish", "macedonian", "malagasy", "malay", "malayalam", "maltese", "maori", "marathi", "mongolian", "myanmar (burmese)", "nepali", "norwegian", "nyanja", "pashto", "persian", "polish", "portugese", "punjabi", "romanian", "russian", "samoan", "scottish gaelic", "serbian", "sesotho", "shona", "sindhi", "sinhala", "slovak", "slovenian", "somali", "spanish", "sundanese", "swahili", "swedish", "tajik", "tamil", "telugu", "thai", "turkish", "ukrainian", "urdu", "uzbek", "vietnamese", "welsh", "xhosa", "yiddish", "yoruba", "zulu"];

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This will translate your language to the recommended language',

            category: 'Fun'

        });

    }

    async run(client, message, args) {
        let language = args[0];
    let text = args.slice(1).join(" ");

    if (!language && !langs.includes(language))
    return message.reply("What language am I Supposed to translate to?")
    if (!text) return message.reply("What am I supposed to translate?");
    
    const result = await translate(text, {to: language});

    const e = new MessageEmbed()
    .setDescription(result.text)
    .setTitle("Thunder Translate")
    .setColor('#010030')
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp(); 

    message.channel.send(e);
};
  }