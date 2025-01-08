import { Body, Controller, Post } from '@nestjs/common';
import { SushoAsistenteService } from './susho-asistente.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('susho-asistente')
export class SushoAsistenteController {
  constructor(private readonly sushoAsistenteService: SushoAsistenteService) {}

  @Post('user-question')
  async getResponse(@Body() questionDto: QuestionDto) {
    return this.sushoAsistenteService.getResponse(questionDto);
  }
  @Post('get-instruction')
  async getInstruction(@Body() questionDto: QuestionDto) {
    return this.sushoAsistenteService.getInstruction(questionDto);
  }

  @Post('get-unknown-response')
  async getUnknownResponse(@Body() questionDto: QuestionDto) {
    return this.sushoAsistenteService.getUnknownResponse(questionDto);
  }
}
