import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/confirmLogin')
    async confirmLogin(@Body() body) {
        let result = await this.userService.confirmLogin(body)
        return result
    }

    @Post('register')
    register(@Body() body) {
        return this.userService.register(body)
    }

}
