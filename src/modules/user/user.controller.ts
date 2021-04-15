import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UserDto } from './dto/user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this._userService.get(id)
    return user
  }

  @Get()
  async getUsers() {
    const users = await this._userService.getAll()
    return users
  }

  @Post()
  async createUser(@Body() user: UserDto) {
    const createdUser = await this._userService.create(user)
    return createdUser
  }

  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    const updatedUser = await this._userService.update(id, user)
    return updatedUser
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this._userService.delete(id)
  }
}
