import { UsersService } from './users.service';
export declare class UsersCli {
    private readonly usersService;
    constructor(usersService: UsersService);
    createAdmin(username: string, password?: string): Promise<void>;
}
