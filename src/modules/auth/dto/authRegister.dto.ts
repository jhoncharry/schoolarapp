import { AuthRegisterDocument } from './authRegisterDocument.dto';

import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Match } from 'src/helpers/decorators/match.decorator';

export class AuthRegisterDTO {

    @ValidateNested()
    @Type(() => AuthRegisterDocument)
    readonly documento_usuario: AuthRegisterDocument;

    @IsEmail()
    @IsNotEmpty()
    readonly correo: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$/, { message: 'password too weak' })
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Match('password', { message: "passwords don't match" })
    passwordConfirm: string;

}