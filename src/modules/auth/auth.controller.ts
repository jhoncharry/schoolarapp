import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';

import { AuthRegisterDTO } from './dto/authRegister.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() authRegisterDTO: AuthRegisterDTO, @Res() res) {
        try {
            await this.authService.signUp(authRegisterDTO);
            return res.status(HttpStatus.OK).json({
                messsage: "Se ha enviado un correo electronico, por favor verificar",
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                messsage: "No se pudo enviar el correo electronico de confirmacion",
                error
            });
        }
    }

    @Get('/activate/:token')
    async validateEmail(@Param('token') token, @Res() res) {
        try {
            const authRegister = await this.authService.validateEmail(token);
            return res.status(HttpStatus.OK).json({
                messsage: "Usuario registrado y validado",
                authRegister
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                messsage: "No se pudo registrar ni validar el usuario",
                error
            });
        }
    }





}
