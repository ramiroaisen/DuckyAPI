import { Strategy } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { UsersService } from 'src/users/users.service';
import { ApiKeysService } from '../api-keys/api-keys.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    private readonly config;
    private readonly apiKeysService;
    constructor(usersService: UsersService, config: ConfigService, apiKeysService: ApiKeysService);
    validate(payload: any): Promise<object | false>;
}
export {};
