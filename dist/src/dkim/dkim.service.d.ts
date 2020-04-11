import { HttpService } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { DomainsService } from 'src/domains/domains.service';
import { User } from 'src/users/user.entity';
import { DkimKey } from './class/dkim-key.class';
import { AddDkimDto } from './dto/add-dkim.dto';
export declare class DkimService {
    private readonly httpService;
    private readonly config;
    private readonly domainsService;
    private readonly logger;
    constructor(httpService: HttpService, config: ConfigService, domainsService: DomainsService);
    resolveDkimId(domain: string): Promise<string>;
    deleteDkim(user: User, domain: string): Promise<void>;
    getDKIM(user: User, domain: string): Promise<DkimKey>;
    updateDkim(user: User, addDkimDto: AddDkimDto, domain: string): Promise<DkimKey>;
}
