import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('cats')
  getCats(): string {
    return 'cats'
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  test(): string {
    return 'test';
  }

  // @UseGuards(LocalAuthGuard)
  @UseGuards(AuthGuard('local')) //会执行local.strategy.ts中的validate
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
