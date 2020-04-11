import { User } from 'src/users/user.entity';
import { ApiKeysService } from '../api-keys/api-keys.service';
import { AuthService } from './auth.service';
import { AccessToken } from './class/access-token.class';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly apiKeysService;
    constructor(authService: AuthService, apiKeysService: ApiKeysService);
    revokeAllAccessTokens(user: User): Promise<void>;
    getAccessToken(user: User, loginDto: LoginDto): Promise<AccessToken>;
}
