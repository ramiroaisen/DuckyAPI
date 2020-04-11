import { Account } from './account.class';
declare class AccountListItemQuota {
    allowed: number;
    used: number;
}
export declare class AccountListItem extends Account {
    quota: AccountListItemQuota;
}
export {};
