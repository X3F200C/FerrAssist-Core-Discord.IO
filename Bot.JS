/* Dependencies */

const FileSystem = require("fs");
const Discord = require("discord.io");
const Auth = JSON.parse(FileSystem.readFileSync("./Auth.JSON"));

/* Constructors */

const Bot = new Discord.Client({
    "token": Auth.Token,
    "autorun": true
});

/* Constants */

const Prefix = "|";

/* Initialization */

PluginsFolder = FileSystem.readdirSync("./Plugins/");
Plugins = {};

for (I = 0; I < PluginsFolder.length; I++) {
	if (FileSystem.statSync("./Plugins/" + PluginsFolder[I]).isDirectory()) return;
	if ("./Plugins/" + PluginsFolder[I].toUpperCase().endsWith(".JS")) Plugins[PluginsFolder[I].substring(0, PluginsFolder[I].length - 3)] = require("./Plugins/" + PluginsFolder[I]);
}

PluginList = Object.keys(Plugins);
PluginCommands = {};

Handlers = {
    "Events": {},
    "Commands": {}
};

for (N = 0; N < Object.keys(Plugins).length; N++) {
    PluginCommands[PluginList[N]] = {
        "title": Object.keys(Plugins)[N],
        "color": 0xFF1493,
        "fields": []
    };
    CommandList = Object.keys(Plugins[PluginList[N]].Handlers.Commands);
	for (C = 0; C < Object.keys(Plugins[PluginList[N]].Handlers.Commands).length; C++) {
		Handlers.Commands[CommandList[C]] = Plugins[PluginList[N]].Handlers.Commands[CommandList[C]];
		HelpTopic = {
			"Title": "Unnamed",
			"Syntax": "No Syntax",
			"Description": "No Description"
		};
		if (Handlers.Commands[CommandList[C]].HelpTopic["Title"]) {
			HelpTopic["Title"] = Handlers.Commands[CommandList[C]].HelpTopic["Title"];
		}
		if (Handlers.Commands[CommandList[C]].HelpTopic["Syntax"]) {
			HelpTopic["Syntax"] = Handlers.Commands[CommandList[C]].HelpTopic["Syntax"];
		}
		if (Handlers.Commands[CommandList[C]].HelpTopic["Description"]) {
			HelpTopic["Description"] = Handlers.Commands[CommandList[C]].HelpTopic["Description"];
		}
		PluginCommands[PluginList[N]].fields.push({
			"name": Prefix + HelpTopic["Title"],
			"value": "Syntax : ``" + Prefix + HelpTopic["Syntax"] + "``\nSynopsis : ``" + HelpTopic["Description"] + "``",
			"inline": true
		});
	}
}

/* Events */

Bot.on("ready", function (Event) {
    console.log("Bot Ready and Logged In as " + Bot.username + " - " + Bot.id);
    Bot.setPresence({
        "status": "dnd",
        "game": {
            "name": "Being ReWritten",
            "type": 1,
            "url": "https://www.twitch.tv/x3f200c"
        }
    });
});

Bot.on("message", function (User, UserID, ChannelID, Message, Event) {
    Arguments = Message.substring(Prefix.length).split(" ");
    Command = Arguments[0];

    ServerID = Bot.channels[ChannelID].guild_id;

    if (!Message.startsWith(Prefix)) return;
    switch(Command) {
        case "help":
            for (Pl = 0; Pl < PluginList.length; Pl++) {
                Bot.sendMessage({
                    "to": ChannelID,
                    "message": "Help Page for Plugin " + (Pl + 1) + " of " + PluginList.length,
                    "embed": PluginCommands[PluginList[Pl]]
                });
            }
            break;
        default:
            for (C = 0; C < Object.keys(Handlers.Commands).length; C++) {
                if (Object.keys(Handlers.Commands)[C] == Command) {
                    hasPermission = false;
                    for (UserRole = 0; UserRole < Bot.servers[ServerID].members[UserID].roles.length; UserRole++) {
                        if (Bot.servers[ServerID].roles[Bot.servers[ServerID].members[UserID].roles[UserRole]]._permissions & Handlers.Commands[Command].TestPermission) hasPermission = true;
                    }
                    if (!hasPermission) return Bot.sendMessage({
                        "to": ChannelID,
                        "message": "I'm Sorry but you do not have Permission to do that. "
                    });
                    Handlers.Commands[Command].Exec(Bot, Prefix, Command, Arguments, ChannelID, UserID, Message, Event);
                }
            }
            break;
    }
});
