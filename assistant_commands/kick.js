const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user!')
        .setDefaultPermission(false)
        .addUserOption(
            option =>
                option
                    .setName('user')
                    .setDescription('The user to kick')
                    .setRequired(true)
        )
        .addStringOption(
            option =>
                option
                    .setName('reason')
                    .setDescription('The reason for the kick')
                    .setRequired(false)
        )
}