import { Domain, DomainAlias } from 'src/domains/domain.entity';
import { PackagesService } from 'src/packages/packages.service';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly packagesService;
    constructor(userRepository: MongoRepository<User>, packagesService: PackagesService);
    private readonly logger;
    findByUsername(username: string): Promise<User | undefined>;
    findByPackage(packageId: string): Promise<User[]>;
    countByPackage(packageId: string): Promise<number>;
    findById(id: string): Promise<User | undefined>;
    findByIdNoPassword(id: string): Promise<User | undefined>;
    findByDomain(domain: string): Promise<User[] | undefined>;
    countByDomain(domain: string): Promise<number>;
    pushDomain(userId: string, domain: Domain): Promise<User | undefined>;
    pullDomain(userId: string, domain: string): Promise<User>;
    pushAlias(userId: string, domain: string, alias: DomainAlias): Promise<User | undefined>;
    pullAlias(userId: string, alias: string): Promise<User>;
    updateMinTokenDate(userId: string, date?: Date): Promise<User | undefined>;
    createUser(createUserDto: CreateUserDto, admin?: boolean): Promise<User>;
    updateUsernameOrPassword(userId: string, updateuserDto: UpdateUserDto): Promise<User>;
    updatePackage(userId: string, packageId: string): Promise<User>;
    replaceQuotasForPackage(packageId: string, oldQuota: number, newQuota: number): Promise<void>;
}
