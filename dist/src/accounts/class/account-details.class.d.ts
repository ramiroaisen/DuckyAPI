import { Account } from './account.class';
declare class AccountDetailsLimitsQuota {
    allowed: number;
    used: number;
}
declare class AccountDetailsLimitsSend {
    allowed: number;
    used: number;
    ttl: number;
}
declare class AccountDetailsLimitsReceive {
    allowed: number;
    used: number;
    ttl: number;
}
declare class AccountDetailsLimitsForward {
    allowed: number;
    used: number;
    ttl: number;
}
declare class AccountDetailsLimits {
    quota: AccountDetailsLimitsQuota;
    send: AccountDetailsLimitsSend;
    receive: AccountDetailsLimitsReceive;
    forward: AccountDetailsLimitsForward;
}
export declare class AccountDetails extends Account {
    spamLevel: number;
    disabledScopes: ('pop3' | 'imap' | 'smtp')[];
    limits: AccountDetailsLimits;
}
export {};
