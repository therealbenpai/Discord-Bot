# Discord Bot Code

This is a source code repo for a Discord bot running using the Discord.js library. To install the bot, you will need to run `npm i`.

## Directorys and what they are for:
### [Configuration Files](./config-files/)
Used for command configuration and other settings.

**Main File(s):**
- [Main Config](config-files/config.json)
    - Holds the bot prefix and a namespace UUID for v5 UUIDs in error reporting.
- [Environment Variables](.env.example)
    - Holds the bot token and other environment variables.
    - **NOTE:** You will need to rename this file to `.env` and fill in the variables.

### [Sorce Code Reasources](./src/)
Used for custom functions

**Main File(s):**
- [Random Functions](./src/randomGenerators.js)
    - Used for random generation
- [Database Functions](./src/database.js)
    - Used for database functions

### [Main Bot Commands](./commands/)
Command files for the main bot

**Commands:**
1) `/aww` (r/aww command)
2) `/giveaway` (Giveaway command)
3) `/server` (Server information)
4) `/support` (Support Server Info)
5) `/user` (User Info)

### [Assistant Bot Commands](./assistant_commands/)
Command files for the assistant bot

**Commands:**
1) `/about` (About the bot command)
2) `/announce` (Announcement command)
3) `/ban` (Ban command)
4) `/kick` (Kick command)
5) `/mute` (Mute command)