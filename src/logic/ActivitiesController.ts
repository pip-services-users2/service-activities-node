import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';

import { PartyActivityV1 } from '../data/version1/PartyActivityV1';
import { IActivitiesPersistence } from '../persistence/IActivitiesPersistence';
import { IActivitiesController } from './IActivitiesController';
import { ActivitiesCommandSet } from './ActivitiesCommandSet';

export class ActivitiesController implements IConfigurable, IReferenceable, ICommandable, IActivitiesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-activities:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ActivitiesController._defaultConfig);
    private _persistence: IActivitiesPersistence;
    private _commandSet: ActivitiesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IActivitiesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ActivitiesCommandSet(this);
        return this._commandSet;
    }
    
    public async getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PartyActivityV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }
        
    public async logPartyActivity(correlationId: string, activity: PartyActivityV1): Promise<PartyActivityV1> {
        
        activity.time = DateTimeConverter.toNullableDateTime(activity.time);
        activity.time = activity.time || new Date();

        return await this._persistence.create(correlationId, activity);
    }
    
    public async batchPartyActivities(correlationId: string, activities: PartyActivityV1[]): Promise<void> {
        let tasks = [];

        for (let activity of activities) 
            tasks.push(
                this._persistence.create(correlationId, activity)
            );

        await Promise.all(tasks);
    }

    public async deletePartyActivities(correlationId: string, filter: FilterParams): Promise<void> {
        await this._persistence.deleteByFilter(correlationId, filter);
    }

}
