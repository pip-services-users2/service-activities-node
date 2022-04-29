import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class ActivitiesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/activities');
        this._dependencyResolver.put('controller', new Descriptor('service-activities', 'controller', 'default', '*', '1.0'));
    }
}