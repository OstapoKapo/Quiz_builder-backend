import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [QuizController],
  providers: [QuizService, PrismaService],
  exports: [QuizService],
  imports: [PrismaModule]
})
export class QuizModule {}
