import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdParams } from './dto/user-id-params.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<void>;
    getMe(user: User): Promise<User>;
    updateMe(user: User, updateUserDto: UpdateUserDto): Promise<void>;
    updateUser(updateUserAdminDto: UpdateUserAdminDto, userIdParams: UserIdParams): Promise<void>;
}
