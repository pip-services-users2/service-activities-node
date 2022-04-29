import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { PartyActivityV1 } from '../data/version1/PartyActivityV1';

export interface IActivitiesPersistence {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PartyActivityV1>>;

    create(correlationId: string, activity: PartyActivityV1): Promise<PartyActivityV1>;

    deleteByFilter(correlationId: string, filter: FilterParams): Promise<void>;
}
