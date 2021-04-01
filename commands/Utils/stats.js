const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const os = require ("os"),
      ms = require("ms"),
{utc} = require("moment")
const { version } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {		super(...args, {

			aliases: [],

			category: 'Utils'

		});

	}

	async run(client, message, args) {
               
                const core = os.cpus()[0];                                                                                                                              
  const embed = new MessageEmbed()                                                                                                                              
                        .setThumbnail(this.client.user.displayAvatarURL())                                                                                                    
                        .setColor( '#000034')                                                                                                 
                        .addField('General:', [                                                                                                                                                                                                                   
                                `**:white_small_square: Developers:** ${this.client.config.owners.map(o => this.client.users.cache.get(o)).join(" ")}`,                                               
                                `**:white_small_square: Client:** **${this.client.user.tag}** (${this.client.user.id})`,                                                                             
                                `**:white_small_square: Commands:** ${this.client.commands.size}`,                                                                                               
                                `**:white_small_square: Servers:** ${this.client.guilds.cache.size.toLocaleString()} `,                                                                          
                                `**:white_small_square: Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,                                           
                                `**:white_small_square: Channels:** ${this.client.channels.cache.size.toLocaleString()}`,                                                                        
                                `**:white_small_square: Creation Date:** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,                                             
                                `**:white_small_square: Node.js:** ${process.version}`,                                                                                                          
                                `**:white_small_square: Version:** v1.0.0`,                                                                                                                 
                                `**:white_small_square: Discord.js:** v${version}`,                                                                                                           
                                '\u200b'                                                                                                                                      
                        ])                                                                                                                                                    
                        .addField('System:', [                                                                                                                                 
                                `**:white_small_square: Platform:** ${process.platform}`,                                                                                                        
                                `**:white_small_square: Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,                                                                                    
                                `**:white_small_square: CPU:**`,                                                                                                                                 
                                `:white_small_square: Cores: ${os.cpus().length}`,                                                                                                          
                                `:white_small_square: Model: ${core.model}`,                                                                                                                
                                `:white_small_square: Speed: ${core.speed}MHz`,                                                                                                             
                        
                        ])
                          message.channel.send(embed)
    }
};
