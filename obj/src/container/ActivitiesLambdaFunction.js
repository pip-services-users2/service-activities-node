"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.ActivitiesLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const ActivitiesServiceFactory_1 = require("../build/ActivitiesServiceFactory");
class ActivitiesLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("activities", "Party activities function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-activities', 'controller', 'default', '*', '*'));
        this._factories.add(new ActivitiesServiceFactory_1.ActivitiesServiceFactory());
    }
}
exports.ActivitiesLambdaFunction = ActivitiesLambdaFunction;
exports.handler = new ActivitiesLambdaFunction().getHandler();
//# sourceMappingURL=ActivitiesLambdaFunction.js.map