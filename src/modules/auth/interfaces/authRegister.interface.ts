import { Document } from "mongoose";

import { AuthRegisterDocument } from '../dto/authRegisterDocument.dto';

export interface AuthRegister extends Document {
    readonly _id: string;
    readonly documento_usuario: AuthRegisterDocument;
    readonly correo: string;
    readonly password: string;
    readonly estado_correo: boolean;
}