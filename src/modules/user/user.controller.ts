import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

import { UserService } from './user.service';

import { CreateUserDTO } from './dto/user.dto';


@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }


    @Get()
    async getProducts(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({
            users
        });
    }

    @Post('/create')
    async createPost(@Body() createUserDto: CreateUserDTO, @Res() res) {
        try {
            const user = await this.userService.createUser(createUserDto);
            return res.status(HttpStatus.OK).json({
                messsage: "User Succesfully Created",
                user
            });
        } catch (error) {
            return res.status(HttpStatus.OK).json({
                messsage: "User Succesfully Created",
                error
            });

        }
    }

}
