export declare class DnsCheckMxRecord {
    exchange: string;
    priority: number;
}
declare class DnsCheckDkimRecord {
    selector: string;
    value: string;
}
declare class DnsCheckCurrentValues {
    mx: DnsCheckMxRecord[];
    spf: string;
    dkim?: DnsCheckDkimRecord;
}
declare class DnsCheckError {
    type: 'ns' | 'mx' | 'spf' | 'dkim';
    error: string;
    message: string;
}
declare class DnsCheckWarning extends DnsCheckError {
}
declare class DnsCheckCorrectValues extends DnsCheckCurrentValues {
}
export declare class DnsCheck {
    currentValues: DnsCheckCurrentValues;
    correctValues: DnsCheckCorrectValues;
    errors: DnsCheckError[];
    warnings: DnsCheckWarning[];
}
export {};
