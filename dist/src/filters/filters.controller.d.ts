import { AccountIdParams } from 'src/accounts/params/account-id.params';
import { User } from 'src/users/user.entity';
import { FilterDetails } from './class/filter-details.class';
import { FilterListItem } from './class/filter-list-item.class';
import { CreateUpdateFilterDto } from './dto/create-update-filter.dto';
import { FiltersService } from './filters.service';
import { FilterIdParams } from './params/filter-id.params';
export declare class FiltersController {
    private readonly filtersService;
    constructor(filtersService: FiltersService);
    deleteFilter(user: User, filterIdParams: FilterIdParams): Promise<void>;
    getFilters(user: User, accountIdParams: AccountIdParams): Promise<FilterListItem[]>;
    getFilterDetails(user: User, filterIdParams: FilterIdParams): Promise<FilterDetails>;
    createFilter(user: User, accountIdParams: AccountIdParams, createUpdateFilterDto: CreateUpdateFilterDto): Promise<void>;
    updateFilter(user: User, filterIdParams: FilterIdParams, createUpdateFilterDto: CreateUpdateFilterDto): Promise<void>;
}
