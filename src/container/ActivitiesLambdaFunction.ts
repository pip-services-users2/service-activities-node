import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';

import { ActivitiesServiceFactory } from '../build/ActivitiesServiceFactory';

export class ActivitiesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("activities", "Party activities function");
        this._dependencyResolver.put('controller', new Descriptor('service-activities', 'controller', 'default', '*', '*'));
        this._factories.add(new ActivitiesServiceFactory());
    }
}

export const handler = new ActivitiesLambdaFunction().getHandler();