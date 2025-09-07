import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateQuizzeDto } from 'src/common/dto/create-quizze.dto';
import { QuizService } from './quiz.service';
import { SubmitQuizDto } from 'src/common/dto/submit-quiz.dto';

@Controller('quizzes')
export class QuizController {
    constructor(
        private readonly quizService: QuizService
    ) {}

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createQuiz(
        @Body() createQuizDto: CreateQuizzeDto,
    ) {
        const quiz = await this.quizService.createQuiz(createQuizDto);
        return { message: 'Quiz created successfully', id: quiz.id };
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getQuizById(@Param('id', ParseIntPipe) id: number) {
        const quiz = await this.quizService.getQuizById(id);
        return { message: 'Get quiz by id', data: quiz };
    }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getAllQuizzes() {
        const quizzes = await this.quizService.getAllQuizzes();
        return { message: 'Get all quizzes', data: quizzes };
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteQuiz(@Param('id', ParseIntPipe) id: number) {
        console.log(typeof id);
        await this.quizService.deleteQuiz(id);
        return { message: 'Quiz deleted successfully'};
    }

    @Post('/:id/submit')
    async submitQuiz(
        @Param('id', ParseIntPipe) quizId: number,
        @Body() answers: SubmitQuizDto,
    ) {
        const score = await this.quizService.checkAnswer(quizId, answers)

        return {  correct: score };
    }
}    
