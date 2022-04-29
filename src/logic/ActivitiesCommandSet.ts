import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';

import { PartyActivityV1Schema } from '../data/version1/PartyActivityV1Schema';
import { IActivitiesController } from './IActivitiesController';

export class ActivitiesCommandSet extends CommandSet {
    private _logic: IActivitiesController;

    constructor(logic: IActivitiesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetPartyActivitiesCommand());
		this.addCommand(this.makeLogPartyActivityCommand());
		this.addCommand(this.makeBatchPartyActivitiesCommand());
		this.addCommand(this.makeDeletePartyActivitiesCommand());
    }

	private makeGetPartyActivitiesCommand(): ICommand {
		return new Command(
			"get_party_activities",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getPartyActivities(correlationId, filter, paging);
            }
		);
	}

	private makeLogPartyActivityCommand(): ICommand {
		return new Command(
			"log_party_activity",
			new ObjectSchema(true)
				.withRequiredProperty('activity', new PartyActivityV1Schema()),
			async (correlationId: string, args: Parameters) => {
                let activity = args.get("activity");
				activity.time = DateTimeConverter.toNullableDateTime(activity.time);
				return await this._logic.logPartyActivity(correlationId, activity);
            }
		);
	}

	private makeBatchPartyActivitiesCommand(): ICommand {
		return new Command(
			"batch_party_activities",
			new ObjectSchema(true)
				.withRequiredProperty('activities', new ArraySchema(new PartyActivityV1Schema())),
			async (correlationId: string, args: Parameters) => {
                let activities = args.getAsArray("activities");
				activities.forEach((a) => {
					a.time = DateTimeConverter.toNullableDateTime(a.time);
				});
				return await this._logic.batchPartyActivities(correlationId, activities);
            }
		);
	}

	private makeDeletePartyActivitiesCommand(): ICommand {
		return new Command(
			"delete_party_activities",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
				return await this._logic.deletePartyActivities(correlationId, filter);
            }
		);
	}

}