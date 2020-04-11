import { UsersService } from 'src/users/users.service';
import { ApiKeysService } from './api-keys.service';
export declare class ApiKeysCli {
    private readonly usersService;
    private readonly apiKeysService;
    constructor(usersService: UsersService, apiKeysService: ApiKeysService);
    createApiKey(username: string, keyName: string): Promise<void>;
}
