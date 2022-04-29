const services = require('../../../../src/protos/activities_v1_grpc_pb');
const messages = require('../../../../src/protos/activities_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { IActivitiesController } from '../../logic/IActivitiesController';
import { ActivitiesGrpcConverterV1 } from './ActivitiesGrpcConverterV1';

export class ActivitiesGrpcServiceV1 extends GrpcService {
    private _controller: IActivitiesController;

    public constructor() {
        super(services.ActivitiesService);
        this._dependencyResolver.put('controller', new Descriptor("service-activities", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IActivitiesController>('controller');
    }

    private async getPartyActivities(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        ActivitiesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = ActivitiesGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.PartyActivityPageReply();
        try {
            let result = await this._controller.getPartyActivities(correlationId, filter, paging);
            let page = ActivitiesGrpcConverterV1.fromPartyActivityPage(result);
            response.setPage(page);

        } catch (err) {
            let error = ActivitiesGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }

    private async logPartyActivity(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let activity = ActivitiesGrpcConverterV1.toPartyActivity(call.request.getActivity());

        let response = new messages.PartyActivityObjectReply();
        try {
            let result = await this._controller.logPartyActivity(correlationId, activity);
            activity = ActivitiesGrpcConverterV1.fromPartyActivity(result);
            
            if (result)
                response.setPartyActivity(activity);
        } catch (err) {
            let error = ActivitiesGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        return response;
    }

    private async batchPartyActivities(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let activities = ActivitiesGrpcConverterV1.toPartyActivities(call.request.getActivitiesList());

        let response = new messages.PartyActivityOnlyErrorReply();
        try {
            await this._controller.batchPartyActivities(correlationId, activities);
        } catch (err) {
            let error = ActivitiesGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        return response;
    }

    private async deletePartyActivities(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = FilterParams.fromValue(call.request.filterMap);

        let response = new messages.PartyActivityOnlyErrorReply();
        try {
            await this._controller.deletePartyActivities(correlationId, filter);
        } catch (err) {
            let error = ActivitiesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    public register() {
        this.registerMethod(
            'get_party_activities',
            null,
            this.getPartyActivities
        );

        this.registerMethod(
            'log_party_activity',
            null,
            this.logPartyActivity
        );

        this.registerMethod(
            'batch_party_activities',
            null,
            this.batchPartyActivities
        );

        this.registerMethod(
            'delete_party_activities',
            null,
            this.deletePartyActivities
        );
        
    }
}