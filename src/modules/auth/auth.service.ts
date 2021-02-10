import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { AuthRegister } from './interfaces/authRegister.interface';
import { AuthRegisterDTO } from './dto/authRegister.dto';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

/* const nodemailer = require('nodemailer');
const { google } = require("googleapis"); */


/* const jwt = require('jsonwebtoken'); */




@Injectable()
export class AuthService {

    constructor(@InjectModel("AuthRegister") private readonly authRegisterModel: Model<AuthRegister>,
        private configService: ConfigService) { }


    async signUp(authRegisterDTO: AuthRegisterDTO): Promise<any> {

        const BASE_URL = this.configService.get('BASE_URL');
        const JWT_SECRET_EMAIL = this.configService.get('JWT_SECRET_EMAIL');
        const CLIENT_ID_EMAIL = this.configService.get('CLIENT_ID_EMAIL');
        const CLIENT_SECRET_EMAIL = this.configService.get('CLIENT_SECRET_EMAIL');
        const REDIRECT_URI_EMAIL = this.configService.get('REDIRECT_URI_EMAIL');
        const REFRESH_TOKEN_EMAIL = this.configService.get('REFRESH_TOKEN_EMAIL');
        const CORREO_EMISOR = this.configService.get('CORREO_EMISOR');

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        authRegisterDTO.password = bcrypt.hashSync(authRegisterDTO.password, salt);

        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID_EMAIL,
            CLIENT_SECRET_EMAIL,
            REDIRECT_URI_EMAIL
        );
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN_EMAIL });

        const token = jwt.sign({ userPreRegister: authRegisterDTO }, JWT_SECRET_EMAIL, { expiresIn: '30m' });

        const output = `
        <h2>Please click on below link to activate your account</h2>
        <p><a href="${BASE_URL}/auth/activate/${token}">ACTIVA TU CUENTA</p></a>
        <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
        `;

        async function sendMail() {
            try {
                const accessToken = await oAuth2Client.getAccessToken();

                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: CORREO_EMISOR,
                        clientId: CLIENT_ID_EMAIL,
                        clientSecret: CLIENT_SECRET_EMAIL,
                        refreshToken: REFRESH_TOKEN_EMAIL,
                        accessToken: accessToken,
                    },
                });

                const mailOptions = {
                    from: `SchoolarApp USCO <${CORREO_EMISOR}>`,
                    to: authRegisterDTO.correo,
                    subject: 'Hello from gmail using API',
                    text: 'Hello from gmail email using API',
                    html: output
                };

                const result = await transport.sendMail(mailOptions);
                return result;
            } catch (error) {
                return error;
            }
        }

        sendMail()
            .then((result) => console.log('Email sent...', result))
            .catch((error) => console.log(error.message));
    }


    async validateEmail(token: string): Promise<any> {

        const JWT_SECRET_EMAIL = this.configService.get('JWT_SECRET_EMAIL');

        try {
            let { userPreRegister } = jwt.verify(token, JWT_SECRET_EMAIL);
            userPreRegister.estado_correo = true;
            const user = new this.authRegisterModel(userPreRegister);
            return await user.save();
        } catch (error) {
            return error;
        }

    }



}



