import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsArray()
  shops?: string[];

  @IsString()
  query: string;

  @IsOptional()
  @IsNumber()
  page?: number;
}
