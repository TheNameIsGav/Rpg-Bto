const Discord = require("discord.js");
const client = new Discord.Client();
var commandStr = "!";
var fs = require("fs");
var glob = require("glob");

var trustedUsers = ["121406882865872901","122022693422891011"]

function Character() {
    this.name = "";
    this.player = "";

    this.strength = 10;
    this.constitution = 10;
    this.dexterity = 10;
    this.intelligence = 10;
    this.wisdom = 10;
    this.charisma = 10;

    this.skills = [];    
}

var character = new Character();

////////////////////////////////////////////////////////////

var jsonString = JSON.stringify(character);

function createNewFile(fileName, message, channel) {
	fs.appendFileSync("characters/" + fileName, message, function(err) {
	    if(err) {
	    	channel.send("ERROR: " + err);		    	
	        return console.log("ERROR: " + err);
	    }
	});
}

function appendFile(fileName, message, channel) {
	fs.appendFileSync("characters/" + fileName, message + "\n", function(err) {
	    if(err) {
	    	channel.send("ERROR: " + err);		    	
	        return console.log("ERROR: " + err);
	    }
	});
}

function doesExist(fileName) {
	if (fs.existsSync("characters/" + fileName)) {return true;} 
	else {return false;}
}

/*function fileList(msg) { //The directory still needs some figuring out
	
	});
}

/*
function readFile(fileName, channel) {
	fs.readFile(fileName, "utf8", function(err, data) {
		if(err) {
	    	channel.send("ERROR: " + err);
	        return console.log("ERROR: " + err);
	    }
	    if(data != "") {
		    var t = data.split('\n');
		    for(var i = 0; i < t.length; i++) {
		    	if(t[i] != "") {
					channel.send(t[i]);
		    	}
		    }
		} else {
			channel.send("The file is empty!");
			console.log("The file is empty!");
		}
	});
}

function resetFile(fileName, channel) {
	fs.writeFile("save.txt", "", function(err) {
	    if(err) {
	    	channel.send("ERROR: " + err);
	        return console.log("ERROR: " + err);
	    }
	    channel.send("The file was reset!");
	    console.log("The file was reset!");
	});
}


fs.open(fileName, 'w', function(err,file) {
if(err) throw err;
	console.log("Saved!");

		*/ 
function trustCheck(message){
	for(var i = 0; i < trustedUsers.length; i++)
	{
		if(message.author.id === trustedUsers[i])
		{return true;}
		else
		{return false;}
	}
	return false
}

client.on("message", (msg) => {
	if(msg.content.substring(0, (commandStr.length)) === commandStr)
	{
		var command = msg.content.substring(commandStr.length);

		if(command === "kill"){
			if(trustCheck(msg)) {
				msg.channel.send("Ending....");
				trustedUsers.length();
			} else {
				msg.channel.send("Insufficient permissions");
			}

		}

		if(command === "ping"){
			msg.channel.send("Pong at " + client.ping + " heartbeats!");
		}
		
		if(command === "tag"){
			msg.channel.send("My tag is " + commandStr);
		}
		
		if(command.includes("change")){
			var newTag = command.substring(7);
			console.log(newTag);
			commandStr = newTag;
			msg.channel.send("My new tag is " + commandStr);
		} 
		
		if(command === "help"){
			msg.channel.send("There are only a few commands, but development is continuing all the time! All commands are case sensitive, so watch out! Such commands include: ```Ping: replies Pong! \nTag: returns the current tag \nChange [arg]: changes the command signiture to [arg] \nHelp: returns this message```")
		}

		if(command.split(" ")[0] === "roll"){
			var information = command.split(" ")[1];
			var front = information.split("d")[0];
			var back = information.split("d")[0];
			var total = 0;
			for(var i = 0; i < front; i++){
				var output = Math.floor(Math.random() * (back + 1) + 1)
				console.log(output)
				msg.channel.send(output);
				total = total + output;
			}
			msg.channel.send("You rolled " + total + " in the end!")
		}
 		
 		if(command === "search"){
 			fileSearch(msg);
 		}

 		if(command.substring(0,2) === "cc"){
 			var val = command.substring(3);
 			var isAlpha = function(ch){return ch.match(/[a-z]/i) === null};
 			if(isAlpha(val))
 			{
 				msg.channel.send("Invalid Character name, please make sure it is alpha characters")
 			}
 			else
 			{
	 			var name = val + ".txt";
	 			if(doesExist(name))
	 				{msg.channel.send("That character already exists, please choose another name!");}
	 			else {
		 			createNewFile(name, "", msg.channel);
		 			appendFile(name, msg.author.id, msg.channel);
		 			msg.channel.send("Character created as " + name)
		 			msg.channel.send("The file was saved!");
		    		console.log("The file was saved as " + name);
 				}
 			}	
 		}
	}
});

client.login(kappa);
client.on("ready", () => { console.log("bot is running!")});