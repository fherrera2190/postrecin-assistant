import { Body, Controller, Post } from '@nestjs/common';
import { SushoAsistenteService } from './susho-asistente.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('susho-asistente')
export class SushoAsistenteController {
  constructor(private readonly sushoAsistenteService: SushoAsistenteService) {}

  @Post('create-thread')
  async createThread() {
    return this.sushoAsistenteService.createThread();
  }

  @Post('user-question')
  async userQuestion(@Body() questionDto: QuestionDto) {
    return this.sushoAsistenteService.userQuestion(questionDto);
  }
}
