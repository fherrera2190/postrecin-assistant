import { Button } from "react-chatbotify";

export const settings = {
  ariaLabel: {
    chatButton: "Chat with me",
    audioButton: "toogle audio",
  },
  // botBubble: {
  //   showAvatar: true,
  //   animate: true,
  // },
  general: {
    showFooter: false,
    flowStartTrigger: "ON_CHATBOT_INTERACT",
    primaryColor: "rgb(211, 125, 98)",
    secondaryColor: "rgb(211, 85, 26)",
  },
  chatHistory: {
    disabled: true,
  },
  userBubble: {
    showAvatar: true,
  },
  // chatWindow: {
  //   defaultOpen: true,
  // },
  botBubble: { simStream: true },
  header: {
    title: "Postrecin",
    buttons: [
      // Button.NOTIFICATION_BUTTON,
      // Button.AUDIO_BUTTON,
      Button.CLOSE_CHAT_BUTTON,
    ],
  },
  tooltip: {
    // mode: "ALWAYS",
    text: "Can i help you?",
  },
};
