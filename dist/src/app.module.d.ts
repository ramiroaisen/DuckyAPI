import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigService } from './config/config.service';
export declare class AppModule implements NestModule {
    private readonly config;
    constructor(config: ConfigService);
    configure(consumer: MiddlewareConsumer): void;
}
