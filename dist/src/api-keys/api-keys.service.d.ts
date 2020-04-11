import { JwtService } from '@nestjs/jwt';
import { ApiKeyAccessToken } from 'src/api-keys/class/api-key-access-token';
import { User } from 'src/users/user.entity';
import { MongoRepository } from 'typeorm';
import { ApiKey } from './api-key.entity';
export declare class ApiKeysService {
    private readonly apiKeyRepository;
    private readonly jwtService;
    constructor(apiKeyRepository: MongoRepository<ApiKey>, jwtService: JwtService);
    generateApiKey(user: User, name: string): Promise<ApiKeyAccessToken>;
    addKey(apiKey: ApiKey): Promise<void>;
    getKey(userId: string, keyId: string): Promise<ApiKey | undefined>;
    revokeKey(userId: string, keyId: string): Promise<void>;
    getKeysForUser(userId: string): Promise<ApiKey[]>;
}
