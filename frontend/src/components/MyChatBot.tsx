import ChatBot from "react-chatbotify";
import { settings } from "../helpers/settings";
import { flow } from "../helpers/flow";

export const MyChatBot = () => {
  return (
    <div className="chatbot">
      <ChatBot settings={settings} flow={flow} />
    </div>
  );
};
