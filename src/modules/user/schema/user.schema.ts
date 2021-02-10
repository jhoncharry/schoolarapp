import { Schema } from "mongoose";

const uniqueValidator = require('mongoose-unique-validator');


const tipos_usuarios_validos = {
    values: ["ADMIN_ROLE", "STUDENT_ROLE", "USER_ROLE"],
    message: "{VALUE} no es un rol valido"
};

export const UserSchema = new Schema({

    auth_register: {
        type: Schema.Types.ObjectId,
        required: [true, "El usuario es necesario"],
        ref: "AuthRegister",
        unique: true
    },
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    primer_apellido: {
        type: String,
        required: true
    },
    segundo_apellido: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    genero: {
        type: Number,
        required: true
    },
    telefono_fijo: {
        type: Number,
        required: true
    },
    celular: {
        type: Number,
        required: true
    },
    comuna: {
        type: Number,
        required: true
    },
    estrato: {
        type: Number,
        required: true
    },
    barrio: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    rh: {
        type: String,
        required: true
    },
    eps: {
        type: String,
        required: true
    },
    alergias: {
        type: Boolean,
        required: true
    },
    discapacidad: {
        type: Boolean,
        required: true
    },
    tipo_usuario: {
        type: String,
        default: "USER_ROLE",
        enum: tipos_usuarios_validos,
        required: true
    },
    estado_usuario: {
        type: Boolean,
        required: true
    }
});


UserSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });