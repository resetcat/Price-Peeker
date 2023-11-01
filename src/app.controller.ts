import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchDto } from './dto/search.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('grocery')
  getAll(@Body() data: SearchDto) {
    return this.appService.getGrocery(data);
  }
}
