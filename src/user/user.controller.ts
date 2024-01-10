import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
