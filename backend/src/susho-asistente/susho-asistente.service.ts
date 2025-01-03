import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { QuestionDto } from './dtos/question.dto';
import { options, tools } from './tools';
import { EnvConfiguration } from 'src/config/app.config';

@Injectable()
export class SushoAsistenteService {
  private openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    // apiKey:"",
  });

  private messages: any = [
    {
      role: 'system',
      content: `
                Asume que eres un asistente de inteligencia artificial para clasificar intenciones de usuarios. 
      Devuelve únicamente una palabra clave que represente la intención basada en las siguientes opciones:
      
      - "showProducts showMenu verMenu verCata" si el usuario quiere ver productos.
      - "help" si el usuario necesita ayuda o soporte.
      - "exit" si el usuario quiere salir.
      - "unknown" si no puedes clasificar la intención.
      
      Ejemplo de entrada: "quiero ver los productos"
      Respuesta esperada: "showProducts"
      
      Entrada: 'userInput'
      Respuesta esperada:

        `,
    },
  ];
  async createThread() {}

  async userQuestion(questionDto: QuestionDto) {
    this.messages.push({
      role: 'user',
      content: questionDto.question,
    });
    try {
      const response = await this.getResponseWithoutTools();

      this.messages.push(response.choices[0].message);

      console.log(response.choices[0].message);

      if (response.choices[0].finish_reason === 'tool_calls') {
        await this.handleFunctionCall(response);
      }

      return this.messages;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
  async getInstruction(questionDto: QuestionDto) {
    this.messages.push({
      role: 'user',
      content: questionDto.question,
    });

    try {
      const response = await this.getResponseWithoutTools();

      this.messages.push(response.choices[0].message);
      return this.messages;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  private async getResponseWithTools() {
    const response = await this.openai.chat.completions.create({
      model: EnvConfiguration().model,
      messages: this.messages,
      tools,
      stream: false,
      parallel_tool_calls: false,
      tool_choice: 'auto',
      temperature: 0,
    });

    return response;
  }

  private async getResponseWithoutTools() {
    const response = await this.openai.chat.completions.create({
      model: EnvConfiguration().model,
      messages: this.messages,
      stream: false,
      temperature: 0,
    });
    return response;
  }

  private async handleFunctionCall(response: any) {
    for (const toolCall of response.choices[0].message.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments);
      console.log(args);

      const functionName = toolCall.function.name;
      if (Object.keys(options).includes(functionName)) {
        const result = await options[functionName](args);
        this.messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
          name: functionName,
        });
      } else {
        this.messages.push({
          role: 'tool',
          content: 'I cant answer this',
          name: functionName,
          tool_call_id: toolCall.id,
        });
      }
    }

    const responseContext = await this.getResponseWithoutTools();

    //    console.log(responseContext.choices);

    this.messages.push(responseContext.choices[0].message);
  }
}
