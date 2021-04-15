import { IsEmail, IsNotEmpty } from 'class-validator'
import { RoleType } from '../../role/roletype.enum'
import { UserDetails } from '../entities/user.details.entity'

export class UserDto {
  id: number

  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  roles: RoleType[]

  details: UserDetails

  @IsNotEmpty()
  password: string
}
