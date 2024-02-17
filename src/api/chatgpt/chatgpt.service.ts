import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ChatGptService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.apiUrl = this.configService.get<string>('OPENAI_API_URL');
  }

  /**
   * @summary Prompt를 통해 ChatGPT에게 질문 후 답변받기
   * @author  이강욱
   * @returns { Promise<string> }
   */
  async createQuestionWithPrompt(prompt: string): Promise<string> {
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: header,
        },
      );

      // console.log(response);
      return response.data.choices[0].message.content;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'ChatGPT에게 질문하는 중 에러가 발생했습니다.',
      );
    }
  }

  async createQuestionWithMultiplePrompt(
    prompt: Array<{ role: string; content: string }>,
  ): Promise<string> {
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: prompt,
        },
        {
          headers: header,
        },
      );

      // console.log(response);
      return response.data.choices[0].message.content;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'ChatGPT에게 질문하는 중 에러가 발생했습니다.',
      );
    }
  }
}
