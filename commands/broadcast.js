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
            
            this.arguments  = args
            this.client     = client
            this.message    = message
            this.permission = 'MENTION_EVERYONE'

        }

        command () {
            
            const embed = new Discord.RichEmbed()

            embed.setAuthor(`Commande effectuée par ${this.message.author.username}#${this.message.author.discriminator} :`, this.message.author.avatarURL)
            embed.setFooter('Estabot | Conçu par Ness et par l\'équipe d\'Estallia', this.client.user.avatarURL)
            embed.setTimestamp()
            
            this.message.delete()

            if (this.message.member.hasPermission(this.permission)) {
                let channel     = isNaN(parseInt(this.arguments[0])) ? this.arguments[0].slice(2, this.arguments[0].length - 1) : this.arguments[0],
                    content_pos = this.arguments.indexOf('|') !== -1 ? this.arguments.indexOf('|') : undefined,
                    content     = content_pos !== undefined ? this.arguments.slice(content_pos + 1).join(' ') : this.arguments.slice(1).join(' ')
                const attachments = content.match(/https:\/\/media.discordapp.net\/attachments\/.*?(.png|.jpg|.webp)/g)
                if (attachments) {
                    for (const image of attachments) {
                        content = content.replace(new RegExp(image, 'g'), '')
                    }
                    if (attachments.length === 1) {
                        embed.setImage(attachments[0])
                    }
                }
                if (content_pos) {
                    embed.setDescription(this.arguments.slice(1, content_pos).join(' '))
                }
                let splitted    = Array.from({ length: Math.ceil(content.split('').length / 1000) }, (v, i) =>
                    content.split('').slice(i * 1000, i * 1000 + 1000)
                ).map(x => x.join(''))
                if (this.client.channels.get(channel)) {

                    embed.setAuthor(`Annonce de ${this.message.author.username}#${this.message.author.discriminator} :`, this.message.author.avatarURL)
                    if (this.message.attachments.size === 1) {
                        embed.setImage(this.message.attachments.get(Array.from(this.message.attachments.keys())[0]).url)
                    } else if (this.message.attachments.size > 1) {
                        for (const image of Array.from(this.message.attachments.keys())) {
                            console.log(this.message.attachments.get(image))
                        }
                    }
                    for (const item in splitted) {
                        if (splitted.length === 1) {
                            embed.addField('Partie de l\'annonce :', splitted[0])
                        } else {
                            embed.addField(`Partie ${parseInt(item) + 1} de l'annonce :`, splitted[item].trim())
                        }
                    }

        
                    this.client.channels.get(channel).send('||@everyone||').then(message => message.delete())
                    this.client.channels.get(channel).send(embed).then(() => {
                        if (attachments && attachments.length > 1) {
                            for (const image of attachments) {
                                this.client.channels.get(channel).send(image)
                            }
                        }
                    })

                } else {

                    embed.addField('Erreur lors de l\'analyse de votre commande :', `Le channel \`${this.arguments[0]}\` n'existe pas !`)

                    this.message.channel.send(embed)

                }
            } else {
                
                embed.addField('Erreur lors de l\'analyse de votre commande :', `Vous n'avez pas la permission requise pour effectuer cette commande ! (Permission nécessaire : ${this.permission.toLowerCase().split('_').join(' ')})`)

                this.message.channel.send(embed)

            }

        }

    }

}