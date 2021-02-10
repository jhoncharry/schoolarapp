import { Schema } from "mongoose";
const uniqueValidator = require('mongoose-unique-validator');


const tipos_documentos_validos = {
    values: ["CC", "TI"],
    message: "{VALUE} no es un documento valido"
};

const AuthRegisterDocumentSchema = new Schema({
    tipo_documento: {
        type: String,
        enum: tipos_documentos_validos,
        required: true
    },
    numero_documento: {
        type: String,
        required: true
    }
})
AuthRegisterDocumentSchema.index({ tipo_documento: 1, numero_documento: 1 }, { unique: true });

export const AuthRegisterSchema = new Schema({
    documento_usuario: {
        type: AuthRegisterDocumentSchema,
        unique: false
    },
    correo: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    estado_correo: {
        type: Boolean,
        default: false
    }
});

AuthRegisterSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único PAPA" });