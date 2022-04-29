import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { PartyActivityV1 } from '../data/version1/PartyActivityV1';
import { IActivitiesPersistence } from './IActivitiesPersistence';
export declare class ActivitiesMongoDbPersistence extends IdentifiableMongoDbPersistence<PartyActivityV1, string> implements IActivitiesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PartyActivityV1>>;
    create(correlationId: string, item: PartyActivityV1): Promise<PartyActivityV1>;
    deleteByFilter(correlationId: string, filter: FilterParams): Promise<void>;
}
