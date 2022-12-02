//@ts-nocheck
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

const {
    MAIN_TOKEN: mainToken,
	MAIN_CLIENT_ID: mainClientID,
    ASSISTANT_TOKEN: assistantToken,
	ASSISTANT_CLIENT_ID: assistantClientID
} = process.env;

const commands = [].map(command => command.toJSON());

const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const AssistantCommands = [].map(command => command.toJSON());

const AssistantCommandFiles = fs
    .readdirSync('./assistant_commands')
    .filter(file => file.endsWith('.js'));

for (const file of AssistantCommandFiles) {
    const command = require(`./assistant_commands/${file}`);
    AssistantCommands.push(command.data.toJSON());
}

const coreRest = new REST({ version: '9' }).setToken(mainToken);

coreRest
    .put(Routes.applicationCommands(mainClientID), { body: commands })
    .then(_ => console.log('Successfully registered Core Global application commands.'))
    .catch(console.error);

const assistantRest = new REST({ version: '9' }).setToken(assistantToken);

assistantRest
    .put(Routes.applicationCommands(assistantClientID), { body: AssistantCommands })
    .then(_ => console.log('Successfully registered Assistant Global application commands.'))
    .catch(console.error);
