import { IsNotEmpty, IsString, } from 'class-validator';

export class AuthRegisterDocument {

    @IsString()
    @IsNotEmpty()
    readonly tipo_documento: string;

    @IsString()
    @IsNotEmpty()
    readonly numero_documento: number;
}