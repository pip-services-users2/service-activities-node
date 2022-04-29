import { ProcessContainer } from 'pip-services3-container-nodex';

import { ActivitiesServiceFactory } from '../build/ActivitiesServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class ActivitiesProcess extends ProcessContainer {

    public constructor() {
        super("activities", "Party activities microservice");
        this._factories.add(new ActivitiesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }
}
