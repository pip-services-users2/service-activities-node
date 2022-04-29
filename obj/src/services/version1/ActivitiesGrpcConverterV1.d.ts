import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { PartyActivityV1 } from '../../data/version1/PartyActivityV1';
import { ReferenceV1 } from '../../data/version1/ReferenceV1';
export declare class ActivitiesGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromReference(reference: ReferenceV1): any;
    static toReference(obj: any): ReferenceV1;
    static fromReferences(references: ReferenceV1[]): any;
    static toReferences(objArr: any): ReferenceV1[];
    static fromPartyActivity(activity: PartyActivityV1): any;
    static toPartyActivity(obj: any): PartyActivityV1;
    static toPartyActivities(objArr: any): PartyActivityV1[];
    static fromPartyActivityPage(page: DataPage<PartyActivityV1>): any;
    static toPartyActivityPage(obj: any): DataPage<PartyActivityV1>;
}
