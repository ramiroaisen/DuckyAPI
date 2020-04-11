import { ApiKeyAccessToken } from 'src/api-keys/class/api-key-access-token';
import { ApiKeyIdParams } from 'src/api-keys/params/api-key-id.params';
import { User } from 'src/users/user.entity';
import { ApiKey } from './api-key.entity';
import { ApiKeysService } from './api-keys.service';
export declare class ApiKeysController {
    private readonly apiKeysService;
    constructor(apiKeysService: ApiKeysService);
    createApiKey(user: User, apiKey: ApiKey): Promise<ApiKeyAccessToken>;
    getApiKeys(user: User): Promise<ApiKey[]>;
    revokeApiKey(user: User, apiKeyIdParams: ApiKeyIdParams): Promise<void>;
}
