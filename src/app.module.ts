import { MiddlewareConsumer, Module } from '@nestjs/common';
import { QuizService } from './quiz/quiz.service';
import { QuizModule } from './quiz/quiz.module';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [QuizModule, PrismaModule],
  controllers: [],
  providers: [ QuizService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes('*');
  }
}
