const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Announce something!')
        .setDefaultPermission(false)
        .addStringOption(
            option =>
                option
                    .setName('message')
                    .setDescription('The message to announce')
                    .setRequired(true)
        )
        .addBooleanOption(
            option =>
                option
                    .setName('pung')
                    .setDescription('Whether to ping everyone')
                    .setRequired(false)
        )
}