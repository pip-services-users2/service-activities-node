import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { PartyActivityV1 } from '../data/version1/PartyActivityV1';
import { IActivitiesController } from './IActivitiesController';
export declare class ActivitiesController implements IConfigurable, IReferenceable, ICommandable, IActivitiesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PartyActivityV1>>;
    logPartyActivity(correlationId: string, activity: PartyActivityV1): Promise<PartyActivityV1>;
    batchPartyActivities(correlationId: string, activities: PartyActivityV1[]): Promise<void>;
    deletePartyActivities(correlationId: string, filter: FilterParams): Promise<void>;
}
