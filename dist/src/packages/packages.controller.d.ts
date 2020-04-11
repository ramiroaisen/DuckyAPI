import { UsersService } from 'src/users/users.service';
import { PackageIdParams } from './dto/package-id.params';
import { Package } from './package.entity';
import { PackagesService } from './packages.service';
export declare class PackagesController {
    private readonly packagesService;
    private readonly usersService;
    constructor(packagesService: PackagesService, usersService: UsersService);
    getPackages(): Promise<Package[]>;
    createPackage(packaget: Package): Promise<Package>;
    updatePackage(packaget: Package, packageIdParams: PackageIdParams): Promise<Package>;
    deletePackage(packageIdParams: PackageIdParams): Promise<void>;
}
