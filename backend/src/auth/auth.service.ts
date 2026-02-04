// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async signup(email: string, password: string, location: string) {
        const hashed = await bcrypt.hash(password, 10);
        const user = new this.userModel({ email, password: hashed, location });
        return user.save();
    }

    async login(email: string, password: string, location: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new UnauthorizedException('Usuario no encontrado');

        // Verificar bloqueo
        if (user.lockUntil && user.lockUntil > new Date()) {
            throw new UnauthorizedException('Cuenta bloqueada, intenta más tarde');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 3) {
                user.lockUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos
                user.loginAttempts = 0;
            }
            await user.save();
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Resetear intentos
        user.loginAttempts = 0;
        user.lockUntil = null;
        user.lastSession = new Date();
        user.location = location;
        await user.save();

        return { message: 'Login exitoso', user };
    }
}