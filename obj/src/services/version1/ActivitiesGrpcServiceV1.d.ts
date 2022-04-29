import { IReferences } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';
export declare class ActivitiesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getPartyActivities;
    private logPartyActivity;
    private batchPartyActivities;
    private deletePartyActivities;
    register(): void;
}
