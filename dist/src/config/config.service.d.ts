export declare type EnvConfig = Record<string, any>;
export declare class ConfigService {
    private readonly envConfig;
    constructor(filePath: string);
    private validateInput;
    get<T>(key: string): T;
}
