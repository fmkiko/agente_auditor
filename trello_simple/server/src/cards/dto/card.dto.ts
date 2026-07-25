import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  columnId: string;

  @IsNumber()
  @IsOptional()
  position?: number;
}

export class UpdateCardDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  position?: number;
}

export class MoveCardDto {
  @IsUUID()
  columnId: string;

  @IsNumber()
  position: number;
}
