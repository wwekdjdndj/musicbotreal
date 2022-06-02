module.exports = {
    name: "join",
    cooldown: 3,
    description: 'join the channel 24/7',
    aliases: [],
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
            voiceChannel.join();
            message.channel.send(
                new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`🗃️ | Done Joined <#${voiceChannel.id}>`)
            )
        } catch (err) {
            console.log(err)
        }
    }
};