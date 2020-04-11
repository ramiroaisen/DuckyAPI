import { HttpService } from '@nestjs/common';
import { Queue } from 'bull';
import { ConfigService } from 'src/config/config.service';
import { DkimService } from 'src/dkim/dkim.service';
import { DeleteForDomainData } from 'src/tasks/delete-for-domain/delete-for-domain.interfaces';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { DnsCheck } from './class/dns.class';
import { Domain } from './domain.entity';
export declare class DomainsService {
    private readonly usersService;
    private readonly dkimService;
    private readonly config;
    private readonly httpService;
    readonly taskQueue: Queue<DeleteForDomainData>;
    private readonly logger;
    constructor(usersService: UsersService, dkimService: DkimService, config: ConfigService, httpService: HttpService, taskQueue: Queue<DeleteForDomainData>);
    getDomains(user: User): Promise<Domain[]>;
    checkDns(user: User, domain: string): Promise<DnsCheck>;
    checkIfDomainAlreadyExists(user: User, domain: string): Promise<void>;
    checkIfDomainIsAddedToUser(user: User, domain: string, includeAliases?: boolean): Promise<void>;
    addDomain(user: User, domain: string): Promise<void>;
    deleteDomain(user: User, domain: string): Promise<void>;
    addAlias(user: User, domain: string, alias: string): Promise<void>;
    deleteAlias(user: User, domain: string, alias: string): Promise<void>;
}
