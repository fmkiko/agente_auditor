import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class UpdateBoardDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;
}
