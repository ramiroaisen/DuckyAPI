export declare class DomainAlias {
    domain: string;
    dkim?: boolean;
}
export declare class Domain extends DomainAlias {
    admin?: boolean;
    aliases?: DomainAlias[];
}
