import CommandInt from "../../interfaces/CommandInt";
import FactInt from "../../interfaces/commands/FactInt";
import axios from "axios";
import { MessageEmbed } from "discord.js";

const fact: CommandInt = {
  name: "fact",
  description: "Returns a fun fact!",
  category: "game",
  run: async (message) => {
    try {
      const { Becca, channel } = message;

      // Get the data information from the random API.
      const data = await axios.get<FactInt>(
        "https://uselessfacts.jsph.pl/random.json?language=en"
      );

      const { source_url, text } = data.data;

      // Send the embed to the current channel.
      await channel.send(
        new MessageEmbed()
          .setColor(Becca.color)
          .setTitle("Did you know?")
          .setURL(source_url)
          .setDescription(text)
      );
      await message.react(message.Becca.yes);
    } catch (error) {
      await message.react(message.Becca.no);
      if (message.Becca.debugHook) {
        message.Becca.debugHook.send(
          `${message.guild?.name} had an error with the fact command. Please check the logs.`
        );
      }
      console.log(
        `${message.guild?.name} had the following error with the fact command:`
      );
      console.log(error);
      message.reply("I am so sorry, but I cannot do that at the moment.");
    }
  },
};

export default fact;
