import { Body, Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRights } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles([UserRights.OWNER])
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles([UserRights.OWNER])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles([UserRights.OWNER])
  update(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles([UserRights.OWNER])
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.userService.remove(id);
  }
}
