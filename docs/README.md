# Discord Bot Code

**NOTICE: This is not up to date. Do not use this. I will update it later**

This is a source code repo for a Discord bot running using the Discord.js library. To install the bot, you will need to run `npm i` (for the CLI, run `npm i sparty18-cli`).

## Directorys and what they are for:
### [Configuration Files](./config-files/)
Used for command configuration and other settings.

**Main File(s):**
- [Main Config](config-files/main_config.json)
    - Holds the bot token, server id(s), and the bot id
    - **NOTE** When setting up, rename this file from `main_config.json` to just `config.json`
### Data Files (Added after cmd usage)
Used for the moderation commands `/warns` and `/modnotes`
### Logging Files (Not added by defult, will be added after usage of each section)
Used for logging bot usage and errors.

**Main File(s):**
- `allowcmd.log` (Allow Command Log)
    - Logs when a user runs a command that they have the proper permisions to do so
    - Syntax:
    ```
    mm/dd/yy hh:mm:ss AM/PM :
        - UserID: User.id
        - User: User.tag
        - Command: commandName
        - Session UUID: SessionUUID
    ```
- `denycmd.log`
    - Logs when a user runs a command that they don't have the proper permisions to do so
    - Syntax is identical as `allowcmd.log`
- `echo.log`
    - Logs when a user runs the `/echo` command
    - Syntax:
    ```
    mm/dd/yy hh:mm:ss AM/PM :
        - UserID: User.id
        - User: User.tag
        - Message: EchoStringContent
        - Exp: ExplistBoolean
        - Session UUID: SessionUUID
    ```
- `errorlog.log`
    - Logs when the `catch` block is triggred in the code and logs the error details
    - Syntax:
    ```
    mm/dd/yy hh:mm:ss AM/PM :
        - Error: ErrorDetails
    ```
- `rdm.log`
    - Logs when a user runs the `/rdm` command
    - Syntax:
    ```
    mm/dd/yy hh:mm:ss AM/PM :
        - UserID: User.id (interaction.user)
        - User: User.tag (interaction.user)
        - EndUserID: User.id (user.send)
        - EndUser: User.tag (user.send)
        - Message: rdmStringContent
        - Exp: ExplisitBoolean
        - Session UUID: SessionUUID
    ```
- `session.log`
    - Logs when a new bot session is started
    - Syntax:
    ```
    Session Info :
        - Session Date mm/dd/yy
        - Session Start Time: hh:mm:ss AM/PM
        - Session UUID: SessionUUID
    ```
### [Sorce Code Reasources](./src/)
Used for custom functions and varables; and used for logging.

**Main File(s):**
- [Logging Functions](./src/logfunc.js)
    - Used for logging
- [Utility Functions](./src/util-func.js)
    - Contains Utility Functions used in multible files
- [Utility Varibles](./src/util-vars.js)
    - Contains Utility Varibles used in multible files
### [Global Commands](./gcommands/)
Global Command Files

**Commands:**
1) `/about` (Information on the bot)
2) `/restart` (Restarts the bot)
3) `/server` (Server Info)
4) `/user` (User Info)
### [Server Specific Commands](./sscommands/)
Server Specific Command Files

**Commands:**
1) `/ad` (Advertisment)
2) `/addstaff` (Add Staff Role)
3) `/announce` (Announcement)
4) `/balls` ("Balls")
5) `/ban` (Ban a user)
6) `/botkill` (Kill the bot)
7) `/dare` (Date *(for truth ot dare)*)
8) `/eannounce` (Embeded Announcemnt)
9) `/echo` (Echo)
10) `/feedback` (Submit Feedback)
11) `/kick` (Kick a user)
12) `/math` (Do Math)
13) `/modnotes` (Moderation Notes)
14) `/newchannel` (New Channel)
15) `/ping` (Ping)
16) `/qrule` (Quick Rule)
17) `/randomfact` (Random Fact)
18) `/rdm` (Random DM)
19) `/session` (Session Info)
20) `/sotd` (Song of the Day)
21) `/status` (Bot Status Messages)
22) `/statusint` (Bot Status Messages Change Interval)
23) `/timeout` (Timeout a user)
24) `/tod` (Truth or dare)
25) `/truth` (Truth *(for thruth or dare)*)
26) `/unban` (Unban a user)
27) `/warns` (Warn a user)
