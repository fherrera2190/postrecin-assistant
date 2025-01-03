import ChatBot from "react-chatbotify";
import { flow } from "../helpers/flow";
import { settings } from "../helpers/settings";

export const MyChatBot = () => {
  return (
    <div className="chatbot">
      <ChatBot settings={settings} flow={flow} />
    </div>
  );
};
