import { Forwarder } from './forwarder.class';
declare class ForwarderDetailsForwards {
    allowed: number;
    used: number;
    ttl: number;
}
declare class ForwarderDetailsLimits {
    forward: ForwarderDetailsForwards;
}
export declare class ForwarderDetails extends Forwarder {
    name: string;
    targets: string[];
    limits: ForwarderDetailsLimits;
}
export {};
