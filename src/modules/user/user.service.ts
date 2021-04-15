import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './repositories/user.repository'
import { User } from './entities/user.entity'
import { UserDetails } from './entities/user.details.entity'
import { getConnection } from 'typeorm'
import { Role } from '../role/entities/role.entity'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async get(id: number): Promise<User> {
    const user = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    })
    if (!user) throw new NotFoundException()
    return user
  }

  async getAll(): Promise<User[]> {
    const users = await this._userRepository.find({
      where: { status: 'ACTIVE' },
    })

    return users
  }

  async create(userDto: UserDto): Promise<User> {
    const newUser = this._userRepository.create()
    const details = new UserDetails()
    const roleRepo = getConnection().getRepository(Role)
    const defaultRole = await roleRepo.findOne({ where: { name: 'GENERAL' } })

    const user = await this._userRepository.findOne({
      where: [{ username: userDto.username }, { email: userDto.email }],
    })
    if (user)
      if (user.email === userDto.email)
        throw new ConflictException('Email is already taken')
      else if (user.username === userDto.username)
        throw new ConflictException('Username is already taken')

    newUser.username = userDto.username
    newUser.roles = [defaultRole]
    newUser.details = details
    newUser.email = userDto.email
    newUser.password = userDto.password

    const saved = await this._userRepository.save(newUser)
    return saved
  }

  async update(id: number, user: User): Promise<void> {
    await this._userRepository.update(id, user)
  }

  async delete(id: number): Promise<void> {
    const userExists = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    })

    if (!userExists) throw new NotFoundException()

    await this._userRepository.update(id, { status: 'DISABLED' })
  }
}
