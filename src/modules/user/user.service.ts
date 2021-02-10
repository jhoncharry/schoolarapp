import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel("User") private readonly userModel: Model<User>) { }


    async getUsers(): Promise<User[]> {
        return await this.userModel.find()
            .populate("auth_register", "documento_usuario correo");
    }


    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = new this.userModel(createUserDTO);
        return await newUser.save();
    }


}
