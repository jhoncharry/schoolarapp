import { Document } from "mongoose";

export interface User extends Document {
    readonly _id: string;
    readonly auth_register: string;
    readonly nombre: string;
    readonly primer_apellido: string;
    readonly segundo_apellido: string;
    readonly fecha_nacimiento: Date;
    readonly genero: number;
    readonly telefono_fijo: number;
    readonly celular: number;
    readonly comuna: number;
    readonly estrato: number;
    readonly barrio: string;
    readonly direccion: string;
    readonly rh: string;
    readonly eps: string;
    readonly alergias: boolean;
    readonly discapacidad: boolean;
    readonly tipo_usuario: string;
    readonly estado: boolean;
}