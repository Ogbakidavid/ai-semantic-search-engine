import { IsString, IsNotEmpty, MinLength} from 'class-validator';

export class CreateDocumentDto {
   @IsString()
   @IsNotEmpty()
   title: string;

   @IsString()
   @IsNotEmpty()
   @MinLength(10)
   content: string;
}