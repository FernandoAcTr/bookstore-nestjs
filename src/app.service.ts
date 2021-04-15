import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    console.log('debug')

    return 'Hello World from Nest Debug!'
  }
}
