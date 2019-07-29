module.exports = {
    "Handlers": {
        "Commands": {
            "mute": {
                "HelpTopic": {
                    "Title": "mute",
                    "Syntax": "mute @User Reason",
                    "Description": "Mute a Server Member"
                },
                "TestPermission": 0x00400000,
                "Exec": function (Bot, Prefix, Command, Arguments, ChannelID, UserID, Message, Event) {
                    ServerID = Bot.channels[ChannelID].guild_id;
                    if (!ServerID) return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "Please Run this Command on a Server, not in Direct Messages. "
                    });

                    MemberID = Event.d.mentions[0].id;
                    if (!Bot.servers[ServerID].members[MemberID]) return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "This Member doesn't Exist on that Guild. "
                    });

                    MutedRole = "";
                    for (R = 0; R < Object.keys(Bot.servers[ServerID].roles).length; R++) {
                        if (Bot.servers[ServerID].roles[Object.keys(Bot.servers[ServerID].roles)[R]]._permissions == 101778945) MutedRole = Object.keys(Bot.servers[ServerID].roles)[R];
                    }
                    if (MutedRole == "") {
                        Bot.createRole(ServerID, function (Error, Response) {
                            if (Error) return Bot.sendMessage({
                                "to": ChannelID,
                                "typing": true,
                                "message": "Sorry, an Error has Occured. Check my Permissions and the Role Hierarchy. "
                            });
                            MutedRole = Response.id
                            Bot.editRole({
                                "serverID": ServerID,
                                "roleID": Response.id,
                                "name": "Muted",
                                "color": 0xFF0000,
                                "permissions": {
                                    "GENERAL_CREATE_INSTANT_INVITE": true,
                                    "GENERAL_KICK_MEMBERS": false,
                                    "GENERAL_BAN_MEMBERS": false,
                                    "GENERAL_ADMINISTRATOR": false,
                                    "GENERAL_MANAGE_CHANNELS": false,
                                    "GENERAL_MANAGE_GUILD": false,
                                    "TEXT_ADD_REACTIONS": false,
                                    "VIEW_AUDIT_LOG": false,
                                    "VIEW_CHANNEL": true,
                                    "TEXT_SEND_MESSAGES": false,
                                    "TEXT_SEND_TTS_MESSAGES": false,
                                    "TEXT_MANAGE_MESSAGES": false,
                                    "TEXT_EMBED_LINKS": false,
                                    "TEXT_ATTACH_FILES": false,
                                    "TEXT_READ_MESSAGE_HISTORY": true,
                                    "TEXT_MENTION_EVERYONE": false,
                                    "TEXT_USE_EXTERNAL_EMOJIS": false,
                                    "VOICE_CONNECT": true,
                                    "VOICE_SPEAK": false,
                                    "VOICE_MUTE_MEMBERS": false,
                                    "VOICE_DEAFEN_MEMBERS": false,
                                    "VOICE_MOVE_MEMBERS": false,
                                    "VOICE_USE_VAD": true,
                                    "VOICE_PRIORITY_SPEAKER": false,
                                    "GENERAL_CHANGE_NICKNAME": true,
                                    "GENERAL_MANAGE_NICKNAMES": false,
                                    "GENERAL_MANAGE_ROLES": false,
                                    "GENERAL_MANAGE_WEBHOOKS": false,
                                    "GENERAL_MANAGE_EMOJIS": false
                                }
                            });
                        });
                    }

                    Bot.addToRole({
                        "serverID": ServerID,
                        "userID": MemberID,
                        "roleID": MutedRole
                    }, function (Error, Response) {
                        if (Error) return Bot.sendMessage({
                            "to": ChannelID,
                            "typing": true,
                            "message": "Sorry, an Error has Occured. Check my Permissions and the Role Hierarchy. "
                        });

                        Bot.sendMessage({
                            "to": ChannelID,
                            "typing": true,
                            "message": "Success. "
                        });
                    });
                }
            },
            "unmute": {
                "HelpTopic": {
                    "Title": "unmute",
                    "Syntax": "unmute @User",
                    "Description": "UnMute a Server Member"
                },
                "TestPermission": 0x00400000,
                "Exec": function (Bot, Prefix, Command, Arguments, ChannelID, UserID, Message, Event) {
                    ServerID = Bot.channels[ChannelID].guild_id;
                    if (!ServerID) return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "Please Run this Command on a Server, not in Direct Messages. "
                    });

                    MemberID = Event.d.mentions[0].id;
                    if (!Bot.servers[ServerID].members[MemberID]) return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "This Member doesn't Exist on that Guild. "
                    });

                    MutedRole = "";
                    for (R = 0; R < Object.keys(Bot.servers[ServerID].roles).length; R++) {
                        if (Bot.servers[ServerID].roles[Object.keys(Bot.servers[ServerID].roles)[N]]._permissions == 101778945) MutedRole = Bot.servers[ServerID].roles[Object.keys(Bot.servers[ServerID].roles)[N]].id;
                    }
                    if (MutedRole == "") return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "Nobody is Muted on this Server. "
                    });

                    isMuted = false;
                    for (UserRole = 0; UserRole < Bot.servers[ServerID].members[UserID].roles.length; UserRole++) {
        				if (Bot.servers[ServerID].roles[Bot.servers[ServerID].members[UserID].roles[UserRole]] == MutedRole) isMuted = true;
        			}
                    if (!isMuted) return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "This User isn't Muted. "
                    });

                    Bot.removeFromRole({
                        "serverID": ServerID,
                        "userID": MemberID,
                        "roleID": MutedRole
                    }, function (Error, Response) {
                        if (Error) return Bot.sendMessage({
                            "to": ChannelID,
                            "typing": true,
                            "message": "Sorry, an Error has Occured. Check my Permissions and the Role Hierarchy. "
                        });

                        Bot.sendMessage({
                            "to": ChannelID,
                            "typing": true,
                            "message": "Success. "
                        });
                    });
                }
            },
            "kick": {
                "HelpTopic": {
                    "Title": "kick",
                    "Syntax": "kick @User Reason",
                    "Description": "Kick/Expel a Server Member"
                },
                "TestPermission": 0x00000002,
                "Exec": function (Bot, Prefix, Command, Arguments, ChannelID, UserID, Message, Event) {
                    ServerID = Bot.channels[ChannelID].guild_id;
                    if (!ServerID) return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "Please Run this Command on a Server, not in Direct Messages. "
                    });

                    MemberID = Event.d.mentions[0].id;
                    if (!Bot.servers[ServerID].members[MemberID]) return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "This Member doesn't Exist on that Guild. "
                    });

                    Bot.kick({
                        "serverID": ServerID,
                        "userID": MemberID,
                        "reason": Prefix.length + Command.length + Arguments[1].length + 2
                    }, function (Error, Response) {
                        if (Error) return Bot.sendMessage({
                            "to": ChannelID,
                            "typing": true,
                            "message": "Sorry, an Error has Occured. Check my Permissions and the Role Hierarchy. "
                        });

                        Bot.sendMessage({
                            "to": ChannelID,
                            "typing": true,
                            "message": "Success. "
                        });
                    });
                }
            },
            "ban": {
                "HelpTopic": {
                    "Title": "ban",
                    "Syntax": "ban @User Reason",
                    "Description": "Ban a Server Member"
                },
                "TestPermission": 0x00000004,
                "Exec": function (Bot, Prefix, Command, Arguments, ChannelID, UserID, Message, Event) {
                    ServerID = Bot.channels[ChannelID].guild_id;
                    if (!ServerID) return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "Please Run this Command on a Server, not in Direct Messages. "
                    });

                    MemberID = Event.d.mentions[0].id;
                    if (!Bot.servers[ServerID].members[MemberID]) return Bot.sendMessage({
                        "to": ChannelID,
                        "typing": true,
                        "message": "This Member doesn't Exist on that Guild. "
                    });

                    Bot.ban({
                        "serverID": ServerID,
                        "userID": MemberID,
                        "reason": Prefix.length + Command.length + Arguments[1].length + 2
                    }, function (Error, Response) {
                        if (Error) return Bot.sendMessage({
                            "to": ChannelID,
                            "typing": true,
                            "message": "Sorry, an Error has Occured. Check my Permissions and the Role Hierarchy. "
                        });

                        Bot.sendMessage({
                            "to": ChannelID,
                            "typing": true,
                            "message": "Success. "
                        });
                    });
                }
            }
        }
    }
};
