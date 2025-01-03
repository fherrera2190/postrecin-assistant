import OpenAI from "openai";
import ChatBot from "react-chatbotify";

export const ChatbotIA = () => {
  let apiKey = "";
  const modelType = "llama3.2:latest";
  let hasError = false;

  // example openai conversation
  // you can replace with other LLMs such as Google Gemini
  const call_openai = async (params) => {
    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true, // required for testing on browser side, not recommended
        baseURL: "http://localhost:11434/v1",
      });

      // for streaming responses in parts (real-time), refer to real-time stream example
      const chatCompletion = await openai.chat.completions.create({
        // conversation history is not shown in this example as message length is kept to 1
        messages: [{ role: "user", content: params.userInput }],
        model: modelType,
      });
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>",
        chatCompletion.choices[0].message.content
      );

      await params.injectMessage(chatCompletion.choices[0].message.content);
      return "start";
    } catch (error) {
      await params.injectMessage(
        "Unable to load model, is your API Key valid?"
      );
      hasError = true;
    }
  };
  const flow = {
    start: {
      message: "Enter your OpenAI api key and start asking away!",
      path: "loop",
      // isSensitive: true,
    },
    // api_key: {
    //   message: (params) => {
    //     apiKey = params.userInput.trim();
    //     return "Ask me anything!";
    //   },
    //   path: "loop",
    // },
    loop: {
      message: async (params) => {
        const nemesis = await call_openai(params);
        console.log(nemesis);
      },
      // component: (
      //   <div
      //     style={{
      //       display: "flex",
      //       alignItems: "center",
      //       justifyContent: "center",

      //       flexDirection: "column",
      //     }}
      //   >
      //     options: 1-Nemsis 2-Fernando
      //     <button>Hint</button>
      //     <button>Hint</button>
      //   </div>
      // ),
      path: () => {

        console.log(hasError)
        if (hasError) {
          return "start";
        }
        return "loop";
      },
    },
  };
  return (
    <ChatBot
      settings={{
        general: { embedded: true },
        chatHistory: { storageKey: "example_llm_conversation" },
      }}
      flow={flow}
    />
  );
};
