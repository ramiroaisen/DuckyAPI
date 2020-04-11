import { ObjectId } from 'mongodb';
import { Domain } from 'src/domains/domain.entity';
export declare class User {
    _id?: string;
    username: string;
    password?: string;
    minTokenDate: Date;
    domains: Domain[];
    package: ObjectId;
    quota: number;
    roles: string[];
    private hashPassword;
    private setDefaultInsertValues;
}
