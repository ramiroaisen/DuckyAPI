import { AccountsService } from 'src/accounts/accounts.service';
import { DomainsService } from 'src/domains/domains.service';
import { ForwardersService } from 'src/forwarders/forwarders.service';
export declare class DeleteForDomainProcessor {
    private readonly accountsService;
    private readonly forwardersService;
    private readonly domainsService;
    constructor(accountsService: AccountsService, forwardersService: ForwardersService, domainsService: DomainsService);
    private readonly logger;
    private processDeleteAccounts;
    private processDeleteForwarders;
    private processDeleteAliases;
    private onActive;
    private onCompleted;
    private onError;
    private onFailed;
}
