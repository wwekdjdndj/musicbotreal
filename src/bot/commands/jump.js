module.exports = {
    name: "jump",
    cooldown: 3,
    description: 'skip a specific song',
    aliases: ["j"],
    run: async function(client, message, args, user) {
        try {
            const distube = client.distube;
            const { MessageEmbed } = require('discord.js');
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `you have to be in a voice channel to use this command`,
                        color: 0xF70000
                    }
                });
                return
            }
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `the bot need's same permissions to play a music like \`CONNECT\`, \`SPEAK\``,
                        color: 0xF70000
                    }
                });
                return
            }
            if (!args.length) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `please type the song number you wont to jump to it`,
                        color: 0xF70000
                    }
                });
                return
            }
            let queue = distube.getQueue(message);
            if (!queue) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `the server queue is empty please play a music first`,
                        color: 0xF70000
                    }
                });
                return
            }
            try {
                distube.jump(message, parseInt(args[0]))
            } catch (err) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `the bot can't find this song number on the server queue`,
                        color: 0xF70000
                    }
                });
                throw err;
            }
            message.channel.send(
                new MessageEmbed()
                .setAuthor(`⤵ | Jump`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                .setColor('GREEN')
                .setDescription(`⤵ | done jumped to song number \`${args[0]}\``)
                .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            )
        } catch (err) {
            console.log(err)
        }
    }
};