import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleRepository } from './repositories/role.repository'
import { Role } from '../role/entities/role.entity'
import { RoleDto } from './dto/role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<Role> {
    const role = await this._roleRepository.findOne(id)
    if (!role) throw new NotFoundException()
    return role
  }

  async getAll(): Promise<Role[]> {
    const roles = await this._roleRepository.find()
    return roles
  }

  async create(roleDto: RoleDto): Promise<Role> {
    const newRole = this._roleRepository.create()

    const role = await this._roleRepository.findOne({
      where: { name: roleDto.name },
    })
    if (role) throw new ConflictException('Role is already defined')
    newRole.name = roleDto.name
    newRole.descripcion = roleDto.descripcion

    const saved = await this._roleRepository.save(newRole)
    return saved
  }

  async update(id: number, role: UpdateRoleDto): Promise<Role> {
    const oldRole = await this._roleRepository.findOne(id)
    if (!oldRole) throw new NotFoundException()

    await this._roleRepository.update(id, role)
    return this._roleRepository.findOne(id)
  }

  async delete(id: number): Promise<Role> {
    const roleExists = await this._roleRepository.findOne(id)
    if (!roleExists) throw new NotFoundException()

    return await this._roleRepository.remove(roleExists)
  }
}
