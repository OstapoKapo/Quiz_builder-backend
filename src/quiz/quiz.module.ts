import { Module } from '@nestjs/common';
import { QuizController } from '../../test/quiz/quiz.controller';

@Module({
  controllers: [QuizController]
})
export class QuizModule {}
