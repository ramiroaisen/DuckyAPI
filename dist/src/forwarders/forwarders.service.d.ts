import { HttpService } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { DomainsService } from 'src/domains/domains.service';
import { User } from 'src/users/user.entity';
import { ForwarderDetails } from './class/forwarder-details.class';
import { Forwarder } from './class/forwarder.class';
import { CreateForwarderDto } from './dto/create-forwarder.dto';
import { UpdateForwarderDto } from './dto/update-forwarder.dto';
export declare class ForwardersService {
    private readonly httpService;
    private readonly config;
    private readonly domainsService;
    private readonly logger;
    constructor(httpService: HttpService, config: ConfigService, domainsService: DomainsService);
    getForwarders(user: User, domain?: string): Promise<Forwarder[]>;
    getForwarderDetails(user: User, forwarderId: string): Promise<ForwarderDetails>;
    createForwarder(user: User, createForwarderDto: CreateForwarderDto): Promise<void>;
    updateForwarder(user: User, forwarderId: string, updateForwarderDto: UpdateForwarderDto): Promise<void>;
    deleteForwarder(user: User, forwarderId: string): Promise<void>;
}
