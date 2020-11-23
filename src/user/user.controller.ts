import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getHello(): string {
    return 'aaaa';
  }

  @Get('all-user')
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('one-user')
  getOneUser(@Query() query) {
    //console.log(query)
    return this.userService.findPage(query)
  }
}
