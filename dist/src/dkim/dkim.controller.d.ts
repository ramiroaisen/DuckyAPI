import { User } from 'src/users/user.entity';
import { DkimKey } from './class/dkim-key.class';
import { DkimService } from './dkim.service';
import { AddDkimDto } from './dto/add-dkim.dto';
import { DkimParams } from './params/dkim.params';
export declare class DkimController {
    private readonly dkimService;
    constructor(dkimService: DkimService);
    deleteDkim(user: User, dkimParams: DkimParams): Promise<void>;
    getDkim(user: User, dkimParams: DkimParams): Promise<DkimKey>;
    updateDkim(user: User, addDkimDto: AddDkimDto, dkimParams: DkimParams): Promise<DkimKey>;
}
