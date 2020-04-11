declare class CreateUpdateAccountLimits {
    quota?: number;
    send?: number;
    receive?: number;
    forward?: number;
}
export declare class CreateUpdateAccountCommonDto {
    name?: string;
    spamLevel?: number;
    limits?: CreateUpdateAccountLimits;
    disabledScopes?: ('pop3' | 'imap' | 'smtp')[];
}
export {};
