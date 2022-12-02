const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutes a user!')
        .setDefaultPermission(false)
        .addUserOption(
            option =>
                option
                    .setName('user')
                    .setDescription('The user to mute')
                    .setRequired(true)
        )
        .addStringOption(
            option =>
                option
                    .setName('reason')
                    .setDescription('The reason for the mute')
                    .setRequired(false)
        )
        .addIntegerOption(
            option =>
                option
                    .setName('time')
                    .setDescription('The time for the mute (in minutes)')
                    .setRequired(false)
                    .setMaxValue(43800)
                    .setMinValue(1)
        )
}