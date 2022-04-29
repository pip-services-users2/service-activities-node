import { CommandSet } from 'pip-services3-commons-nodex';
import { IActivitiesController } from './IActivitiesController';
export declare class ActivitiesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IActivitiesController);
    private makeGetPartyActivitiesCommand;
    private makeLogPartyActivityCommand;
    private makeBatchPartyActivitiesCommand;
    private makeDeletePartyActivitiesCommand;
}
