module.exports = {
    "Handlers": {
        "Commands": {
            "Exec": {
                "HelpTopic": {
                    "Title": "debug",
                    "Syntax": "debug",
                    "Description": "There is no Debug Command"
                },
                "TestPermission": 0x00000800,
                "Exec": function (Bot, Prefix, Command, Arguments, ChannelID, UserID, Message, Event) {
                    if (["318447821529284610", "357455162111033345"].includes(UserID)) {
                        Code = Message.substring(Prefix.length + Command.length + 1);
        				Output = eval(Code);
                        switch(typeof Output) {
                			case "object":
                                Bot.sendMessage({
                                    "to": ChannelID,
                					"message": "Output : ```JSON\n" + JSON.stringify(Output, null, "\t") + "\n```"
                				});
                                break;
            				case "number":
                                Bot.sendMessage({
                    				"to": ChannelID,
                					"message": "Output : ```JSON\n" + Output.toString() + "\n```"
                    			});
                                break;
                            case "function":
                                Bot.sendMessage({
                                	"to": ChannelID,
                        			"message": "Output : ```JSON\n" + Output.toString() + "\n```"
                        		});
                                break;
            				case "string":
                                Bot.sendMessage({
                					"to": ChannelID,
                					"message": "Output : ```JSON\n" + Output + "\n```"
                            	});
                                break;
                        }
                    }
                }
            }
        }
    }
};
