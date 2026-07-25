import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUUID()
  boardId: string;

  @IsNumber()
  @IsOptional()
  position?: number;
}

export class UpdateColumnDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  position?: number;
}
