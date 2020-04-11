import { ObjectId } from 'mongodb';
export declare class Package {
    _id?: string | ObjectId;
    name: string;
    quota: number;
}
