import { ApiProperty } from "@nestjs/swagger";

export class SubmitQuizDto {
   @ApiProperty({ example: ['Answer1', 'Answer2'], description: 'The answers provided by the user' })
   answer: { [questionId: number]: string | string[] | number };
}