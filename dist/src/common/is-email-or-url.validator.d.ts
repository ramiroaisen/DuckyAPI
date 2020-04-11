import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class EachIsEmailOrHttpOrSmtp implements ValidatorConstraintInterface {
    private validator;
    validate(input: string[]): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
