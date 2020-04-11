import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AccessToken } from './class/access-token.class';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User | null>;
    getAccessToken(user: User, rememberMe?: boolean): Promise<AccessToken>;
    expireTokens(user: User): Promise<void>;
}
