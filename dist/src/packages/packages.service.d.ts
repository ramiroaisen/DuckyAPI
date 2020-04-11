import { UsersService } from 'src/users/users.service';
import { MongoRepository } from 'typeorm';
import { Package } from './package.entity';
export declare class PackagesService {
    private readonly packageRepository;
    private readonly usersService;
    constructor(packageRepository: MongoRepository<Package>, usersService: UsersService);
    getPackages(): Promise<Package[]>;
    getPackageById(id: string): Promise<Package>;
    savePackage(packagep: Package): Promise<Package>;
    deletePackage(id: string): Promise<void>;
}
