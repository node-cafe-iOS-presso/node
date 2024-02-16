import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatGptService } from './api/chatgpt/chatgpt.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly chatGptService: ChatGptService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/asdf')
  async test() {
    return await this.chatGptService.createQuestionWithPrompt(
      'what is your name?',
    );
  }
}
