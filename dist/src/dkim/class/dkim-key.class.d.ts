declare class DnsTxt {
    name: string;
    value: string;
}
export declare class DkimKey {
    id: string;
    domain: string;
    selector: string;
    fingerprint: string;
    publicKey: string;
    dnsTxt: DnsTxt;
    created: string;
}
export {};
