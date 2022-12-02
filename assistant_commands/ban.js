const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user!')
        .setDefaultPermission(false)
        .addUserOption(
            option =>
                option
                    .setName('user')
                    .setDescription('The user to ban')
                    .setRequired(true)
        )
        .addStringOption(
            option =>
                option
                    .setName('reason')
                    .setDescription('The reason for the ban')
                    .setRequired(false)
        )
}