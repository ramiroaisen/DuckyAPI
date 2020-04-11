import { DomainsService } from './domains.service';
export declare class DomainsController {
    private readonly domainsService;
    constructor(domainsService: DomainsService);
    private deleteDomain;
    private getDomains;
    private addDomain;
    private checkDNS;
    private addAlias;
    private deleteAlias;
}
