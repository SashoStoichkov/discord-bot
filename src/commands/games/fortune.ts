import CommandInt from "../../interfaces/CommandInt";
import fortunesList from "../../utils/commands/fortunesList";

const fortune: CommandInt = {
  name: "fortune",
  description: "Tells you a fortune.",
  category: "game",
  run: async (message) => {
    try {
      const { channel } = message;

      // Get a random fortune number.
      const random = ~~(Math.random() * fortunesList.length - 1);

      // Send the random fortune message to the current channel.
      await channel.send(fortunesList[random]);
      await message.react(message.Becca.yes);
    } catch (error) {
      await message.react(message.Becca.no);
      if (message.Becca.debugHook) {
        message.Becca.debugHook.send(
          `${message.guild?.name} had an error with the fortune command. Please check the logs.`
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

export default fortune;
