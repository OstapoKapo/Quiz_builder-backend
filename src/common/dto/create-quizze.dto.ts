import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateQuizzeDto {
    @ApiProperty({example: 'Sample Quiz Title', description: 'The title of the quiz'})
    @IsString()
    title: string;

    @ApiProperty({example: 'This is a sample quiz description.', description: 'The description of the quiz', required: false})
    @IsString()
    description: string;

    @ApiProperty({example: [
        {
            type: "single",
            text: "What is the capital of France?",
            correct: 1,
            options: ["Berlin", "Madrid", "Paris", "Rome"]
        },
        {
            type: "multiple",
            text: "Select the prime numbers.",
            correct: [0, 2],
            options: ["2", "4", "3", "6"]
        },
    ], description: 'The list of questions in the quiz'})
    @IsArray()
    questions: {
        type: "single" | "multiple" | "text",
        text: string,
        correct:  number | number[] | string,
        options?: string[]
    }[] = [];

    @ApiProperty({ example: 'Easy', description: 'The difficulty level of the quiz'})
    @IsString()
    difficulty: "Easy" | "Medium" | "Hard";

    @ApiProperty({ example: 30, description: 'The time limit for the quiz in minutes'})
    @IsNumber()
    time: number
}