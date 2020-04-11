import { CreateUpdateAccountCommonDto } from './create-update-common.dto';
export declare class CreateAccountDto extends CreateUpdateAccountCommonDto {
    address: string;
    password: string;
}
