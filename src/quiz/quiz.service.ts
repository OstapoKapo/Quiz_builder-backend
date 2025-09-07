import { BadRequestException, Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { CreateQuizzeDto } from 'src/common/dto/create-quizze.dto';
import { SubmitQuizDto } from 'src/common/dto/submit-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}
    async createQuiz(dto: CreateQuizzeDto) {
        return this.prismaService.quiz.create({
            data: {
                title: dto.title,
                description: dto.description,
                difficulty: dto.difficulty,
                time: dto.time,
                questions: {
                    create: dto.questions.map(q => ({
                        text: q.text,
                        type: q.type,
                        options: q.options, 
                        correct: q.correct , 
                    }))
                }
            }
        });
    }

    async getAllQuizzes() {
        return this.prismaService.quiz.findMany({
            include: { questions: true }
        });
    }

    async getQuizById(id: number){
        return this.prismaService.quiz.findUnique({
            where: { id },
            include: { questions: true }
        });
    }

    async deleteQuiz(id: number){
        return this.prismaService.quiz.delete({
            where: { id },
        });
    }

    async checkAnswer(
        quizId: number,
        answers: SubmitQuizDto
    ): Promise<number> {
        const quiz = await this.getQuizById(quizId);
        if (!quiz) throw new BadRequestException('Quiz not found');

        let score = 0;

        for (const q of quiz.questions) {
            const userAnswer = answers[q.id];
            if (userAnswer === undefined || userAnswer === null) continue;

                switch (q.type) {
                    case 'single':
                    if (!Array.isArray(q.options)) break;
                    const correctIndex = q.correct as number;
                    const correctAnswer = q.options[correctIndex];
                    if (userAnswer === correctAnswer) score++;
                    break;

                case 'multiple':
                    if (!Array.isArray(q.options)) break;
                    const correctIndexes = q.correct as number[];
                    const correctAnswers = correctIndexes.map(i => q.options![i]).sort();
                    const userAnswers = Array.isArray(userAnswer) ? [...userAnswer].sort() : [];
                    if (
                        userAnswers.length === correctAnswers.length &&
                        userAnswers.every((ans, i) => ans === correctAnswers[i])
                    ) score++;
                    break;

                case 'text':
                    const correctText = String(q.correct ?? '').trim().toLowerCase();
                    const userText = String(userAnswer ?? '').trim().toLowerCase();
                    if (userText === correctText) score++;
                    break;

                default:
                    break;
                }
            }
        return score;
    }
}
