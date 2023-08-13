import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthError } from './auth.errors';

type SignInDto = {
    username: string;
    beakSize: string;
};

type SignUpDto = {
    username: string;
    beakSize: string;
};

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(
            signInDto.username,
            signInDto.beakSize
        );
    }

    @Post('register')
    async signUp(@Body() signUp: SignUpDto) {
        return this.authService.signUp(signUp.username, signUp.beakSize).catch((err) => {
            if (err instanceof AuthError) {
                throw new BadRequestException(err.message);
            }
        });
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
      return req.user;
    }
}
