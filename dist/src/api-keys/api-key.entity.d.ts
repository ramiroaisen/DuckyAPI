import { ObjectID } from 'mongodb';
export declare class ApiKey {
    _id?: string;
    userId?: ObjectID;
    name: string;
    issuedAt?: Date;
}
