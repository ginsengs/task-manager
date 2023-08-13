import { HttpService } from '@nestjs/axios';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private httpService: HttpService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        if (!token) {
            throw new UnauthorizedException();
        }
        console.log('t', token);
        try {
            const { data } = await firstValueFrom(this.httpService.get(`${process.env.AUTH_URL}/auth/profile`, {
                headers: {
                    authorization: token,
                }
            }));
            request['user'] = data;
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException();
        }
        return true;
    }
}
