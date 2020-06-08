/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                Commands
//////////////////////////////////////*/

import Discord from 'discord.js'

export default {

    name        : 'bc',
    description : 'Broadcast command.',
    category    : 'utils',

    run         : class {

        constructor (client, args, message) {
            
            this.arguments = args
            this.client    = client
            this.message   = message

        }

        command () {
            
            
            if (this.message.member.hasPermission('MENTION_EVERYONE')) {
                const channel     = isNaN(parseInt(this.arguments[0])) ? this.arguments[0].slice(2, this.arguments[0].length - 1) : this.arguments[0],
                      embed       = new Discord.RichEmbed(),
                      content_pos = this.arguments.indexOf('|') !== -1 ? this.arguments.indexOf('|') : undefined,
                      content     = content_pos !== undefined ? this.arguments.slice(content_pos + 1).join(' ').split('') : this.arguments.slice(1).join(' ').split(''),
                      splitted    = Array.from({ length: Math.ceil(content.length / 1000) }, (v, i) =>
                            content.slice(i * 1000, i * 1000 + 1000)
                        ).map(x => x.join(''))

                if (content_pos) {
                    embed.setDescription(this.arguments.slice(1, content_pos).join(' '))
                }
                
                embed.setFooter('Estabot | Conçu par Ness', this.client.user.avatarURL)
                embed.setTimestamp()

                if (this.client.channels.get(channel)) {

                    embed.setAuthor(`Annonce de ${this.message.author.username}#${this.message.author.discriminator} :`, this.message.author.avatarURL)
        
                    for (const item in splitted) {
                        if (splitted.length === 1) {
                            embed.addField('Partie de l\'annonce :', splitted[0])
                        } else {
                            embed.addField(`Partie ${parseInt(item) + 1} de l'annonce :`, splitted[item].trim())
                        }
                    }

        
                    this.client.channels.get(channel).send('||@everyone||').then(message => message.delete())
                    this.client.channels.get(channel).send(embed)

                } else {

                    embed.addField('Erreur lors de l\'analyse de votre commande :', `Le channel \`${this.arguments[0]}\` n'existe pas !`)

                    this.message.channel.send(embed)

                }
            } else {
                
                embed.addField('Erreur lors de l\'analyse de votre commande :', `Vous n'avez pas la permission requise pour effectuer cette commande ! (Permission nécessaire : ${'MENTION_EVERYONE'.toLowerCase().split('_').join(' ')})`)

                this.message.channel.send(embed)
            }

        }

    }

}