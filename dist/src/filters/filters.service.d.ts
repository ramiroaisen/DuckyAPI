import { HttpService } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/users/user.entity';
import { FilterDetails } from './class/filter-details.class';
import { FilterListItem } from './class/filter-list-item.class';
import { CreateUpdateFilterDto } from './dto/create-update-filter.dto';
export declare class FiltersService {
    private readonly httpService;
    private readonly accountsService;
    private readonly config;
    private readonly logger;
    constructor(httpService: HttpService, accountsService: AccountsService, config: ConfigService);
    deleteFilter(user: User, accountId: string, filterId: string): Promise<void>;
    getFilters(user: User, accountId: string): Promise<FilterListItem[]>;
    getFilter(user: User, accountId: string, filterId: string): Promise<FilterDetails>;
    createFilter(user: User, accountId: string, createUpdateFilterDto: CreateUpdateFilterDto): Promise<void>;
    updateFilter(user: User, accountId: string, filterId: string, createUpdateFilterDto: CreateUpdateFilterDto): Promise<void>;
}
