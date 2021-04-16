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
import { RoleService } from './role.service'
import { Role } from './entities/role.entity'
import { RoleDto } from './dto/role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':id')
  async getRole(@Param('id', ParseIntPipe) id: number) {
    const role = await this._roleService.get(id)
    return role
  }

  @Get()
  async getRoles() {
    const roles = await this._roleService.getAll()
    return roles
  }

  @Post()
  async createRole(@Body() role: RoleDto) {
    const createdRole = await this._roleService.create(role)
    return createdRole
  }

  @Put(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: UpdateRoleDto,
  ) {
    const updatedRole = await this._roleService.update(id, role)
    return updatedRole
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    return await this._roleService.delete(id)
  }
}
