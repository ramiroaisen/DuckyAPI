import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ForbidApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
