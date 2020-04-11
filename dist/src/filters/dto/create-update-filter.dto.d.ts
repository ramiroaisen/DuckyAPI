import { Filter } from '../class/filter.class';
declare class Query {
    from?: string;
    to?: string;
    subject?: string;
    listId?: string;
    text?: string;
    ha?: boolean | '';
    size?: number | '';
}
declare class Action {
    seen?: boolean | '';
    flag?: boolean | '';
    delete?: boolean | '';
    spam?: boolean | '';
    mailbox?: string;
    targets?: string[] | '';
}
export declare class CreateUpdateFilterDto extends Filter {
    query: Query;
    action: Action;
}
export {};
