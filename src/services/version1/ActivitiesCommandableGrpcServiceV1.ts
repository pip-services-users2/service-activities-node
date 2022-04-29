import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class ActivitiesCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/activities');
        this._dependencyResolver.put('controller', new Descriptor('service-activities', 'controller', 'default', '*', '*'));
    }
}