const Discord = require('discord.js');
const bot = new Discord.Client();
const botconfig = require('./botconfig.json');
const fs = require('fs');
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} server(s)!`);
  
        const activities_list = [
              
          "v2.0",
    `users use me`,
    `servers`,
          "p!help Help",
          "Prefix-p!",
          "Made By 𝘗𝘖𝘞𝘌𝘙乡GZ#8605"
        
        ]; 
     let ActivityType = [

        "2",
    ]


     setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(activities_list[index], {type: "LISTENING", url: "https://www.youtube.com/channel/UC96afyC25gnuT-xA0G4CEOQ?view_as=subscriber"}); // sets bot's activities to one of the phrases in the arraylist.
    }, 5000); // Runs this every 10 seconds.
});
fs.readdir("./commands/", (err, files) => {
  
  if(err) console.log(err);
  
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands!");
    return;
  }
  
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    
  });
  
});

bot.on('message', message => {
  if (message.content.startsWith("Fuck")) {
        message.delete(1000);
    
    
    message.channel.send("No swearing in This server!")
  }
}); 

bot.on('message', message => {
  if (message.content.startsWith("Gz")) {
    
    message.channel.send("LOL ! **Gz** is My Creator")
                      
  }
}); 



 bot.on("guildMemberAdd", member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage(`Welcome ${member.user} to our Discord Server.  Please check out the FAQ channel for documentation and support to help you get started`).catch(console.error);
  });

bot.on("message", async message => {
  
  if(message.author.bot) return;
  
  let prefix = botconfig.prefix;
  
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(prefix.length);
  
  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  if(commandFile) commandFile.run(bot,message,args);
  
});

bot.login(process.env.TOKEN)
