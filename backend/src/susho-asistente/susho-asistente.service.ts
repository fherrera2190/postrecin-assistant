import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { QuestionDto } from './dtos/question.dto';
import { options, tools } from './tools';
import { EnvConfiguration } from 'src/config/app.config';

@Injectable()
export class SushoAsistenteService {
  private openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
  });

  private messages: any = [
    {
      role: 'system',
      content: `
      You are a customer service and online sales assistant called "Sushiko". You specialize in assisting customers with sushi-related inquiries, resolving issues, and guiding them through online purchases.
      
      You should follow these instructions to assist with the sale:
    - Don't invent products or services.
    - Understand the customer's request and gather relevant product details or information about their inquiry.
    - Help the customer view products and assist them in selecting items they wish to add to their cart.
    - Assist with adding products to the cart and confirm if they want to proceed with their selection.
    - Allow the customer to review their cart by showing them the contents, and assist with any modifications, such as removing items from the cart if needed.
    - Guide the customer to confirm their order, ensuring that all details, such as product selections, quantities, and payment information, are accurate before finalizing the transaction.
    - Address any additional questions or concerns they may have about the products, payment, or delivery. Once the customer is satisfied, complete the sale and close the case.
    
    * show this options when the customer asks for help:
      1- Show products
      2- Show cart
      3- Add product to cart, example: add 1 maki de pollo
      4- Delete cart
      5- Exit


    - Do not answer anything that is not related to the customer's request.


    - You can use this information to answer the customer's question:
      Promotions:

    Couples Combo: 20 pieces + one drink of choice for $19.99.
    Happy Hour Sushi: 20% off on orders placed between 3:00 p.m. and 5:00 p.m.

    Delivery Policy:
        
        Delivery Areas: Major cities within a 15 km radius from the branch.
        Delivery Fee: $2.00 for orders under $20. Free delivery for orders over $20.
        Estimated Delivery Time: 30-60 minutes, depending on the location.
        
    Refund Policy:
        
        Refunds are available for incorrect orders or delivery issues.
        Customers must report issues within 24 hours of receiving their order.
        
    Frequently Asked Questions:
        
        Do you offer gluten-free options?
            Yes, we provide gluten-free soy sauce and specific menu items for those with gluten restrictions.
        
        Do you have vegan options?
            Yes, we offer vegetable makis, tofu dishes, and our Veggie Sushi Platter.
        
        How can I track my order?
            You will receive a tracking link to monitor the status of your delivery in real time.
        
    Contact Information:
        
        Phone: +1 800-SUSHIKO (800-787-4456)
        Email: support@sushiko.com
        Website: www.sushiko.com
        Address: 123 Sushi Lane, Tokyo Town, Food City.
        Customer Support Hours: Monday to Sunday, 9:00 a.m. to 9:00 p.m.
        
    Only call a tool once in a single message.
    If you need to fetch a piece of information from a system or document that you don't have access to, give a clear, confident answer with some dummy values.
          
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
      const response = await this.getResponseWithTools();

      this.messages.push(response.choices[0].message);

      if (response.choices[0].message.tool_calls) {
        await this.handleFunctionCall(response);
      }

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
          content: 'I dont understand, please try again',
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
