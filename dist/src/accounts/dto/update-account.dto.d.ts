import { CreateUpdateAccountCommonDto } from './create-update-common.dto';
export declare class UpdateAccountDto extends CreateUpdateAccountCommonDto {
    password?: string;
    disabled?: boolean;
}
