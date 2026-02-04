import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: { email: string; password: string; location: string }) {
        return this.authService.signup(body.email, body.password, body.location);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string; location: string }) {
        return this.authService.login(body.email, body.password, body.location);
    }
}