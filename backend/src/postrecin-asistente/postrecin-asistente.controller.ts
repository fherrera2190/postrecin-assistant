import { Body, Controller, Post } from '@nestjs/common';
import { PostrecinAsistenteService } from './postrecin-asistente.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('postrecin-asistente')
export class PostrecinAsistenteController {
  constructor(
    private readonly postrecinAsistenteService: PostrecinAsistenteService,
  ) {}

  @Post('user-question')
  async getResponse(@Body() questionDto: QuestionDto) {
    return this.postrecinAsistenteService.getResponse(questionDto);
  }
  @Post('get-instruction')
  async getInstruction(@Body() questionDto: QuestionDto) {
    return this.postrecinAsistenteService.getInstruction(questionDto);
  }

  @Post('get-unknown-response')
  async getUnknownResponse(@Body() questionDto: QuestionDto) {
    return this.postrecinAsistenteService.getUnknownResponse(questionDto);
  }
}
