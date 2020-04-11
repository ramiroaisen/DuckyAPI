import { HttpService } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { DomainsService } from 'src/domains/domains.service';
import { User } from 'src/users/user.entity';
import { AccountDetails } from './class/account-details.class';
import { AccountListItem } from './class/account-list-item.class';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsService {
    private readonly httpService;
    private readonly config;
    private readonly domainsService;
    private readonly logger;
    constructor(httpService: HttpService, config: ConfigService, domainsService: DomainsService);
    getAccounts(user: User, domain?: string): Promise<AccountListItem[]>;
    getAccountDetails(user: User, accountId: string): Promise<AccountDetails>;
    createAccount(user: User, createAccountDto: CreateAccountDto): Promise<void>;
    updateAccount(user: User, accountId: string, updateAccountDto: UpdateAccountDto): Promise<void>;
    deleteAccount(user: User, accountId: string): Promise<void>;
}
