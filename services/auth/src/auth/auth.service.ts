import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { UserRole } from '@prisma/client';
import { AccountAlreadyError } from './auth.errors';
import { EventsService } from '../events/events.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersServuce: UsersService,
        private readonly jwtService: JwtService,
        private readonly events: EventsService,
    ) {
    }

    async signIn(username: string, beakSize: string) {
        const user = await this.usersServuce.findUser({
            username,
            beak_size: beakSize,
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            accessToken: await this.generateJwtToken(
                user.public_uuid,
                user.username,
                user.role,
            ),
        };
    }

    async signUp(username: string, beakSize: string) {
        const record = await this.usersServuce.findUser({
            username,
            beak_size: beakSize,
        });

        if (record) {
            throw new AccountAlreadyError('Account already');
        }

        const user = await this.usersServuce.createUser({
            username,
            public_uuid: randomUUID(),
            beak_size: beakSize,
        });

        const accessToken = await this.generateJwtToken(
            user.public_uuid,
            user.username,
            user.role,
        );

        const { beak_size, ...payload } = user;

        return {
            accessToken,
        }
    }


    async generateJwtToken(uuid: string, username: string, role: UserRole): Promise<string> {
        const accessToken = await this.jwtService.signAsync({
            sub: uuid,
            username,
            role,
        });
        return accessToken;
    }
}
