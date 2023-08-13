import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    publicId: string;
    password: string;
};

@Injectable()
export class UsersService {}
