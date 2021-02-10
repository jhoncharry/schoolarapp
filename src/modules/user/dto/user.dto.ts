import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength, IsMongoId } from 'class-validator';


export class CreateUserDTO {

    @IsMongoId()
    readonly auth_register: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly nombre: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly primer_apellido: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly segundo_apellido: string;

    @IsDateString()
    @IsNotEmpty()
    readonly fecha_nacimiento: Date;

    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    @Min(100)
    @Max(110)
    readonly genero: number;

    @IsNumberString({ no_symbols: true })
    @IsNotEmpty()
    @MinLength(7)
    readonly telefono_fijo: number;

    @IsNumberString({ no_symbols: true })
    @IsNotEmpty()
    @MinLength(7)
    readonly celular: number;

    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    @Min(1)
    @Max(100)
    readonly comuna: number;

    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    @Min(1)
    @Max(10)
    readonly estrato: number;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly barrio: string;

    @IsString()
    @MinLength(4)
    @MaxLength(40)
    readonly direccion: string;

    @IsString()
    @MinLength(2)
    readonly rh: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly eps: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly alergias: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly discapacidad: boolean;

    @IsString()
    @IsOptional()
    readonly tipo_usuario: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly estado_usuario: boolean;
}