"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class ActivitiesCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/activities');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-activities', 'controller', 'default', '*', '*'));
    }
}
exports.ActivitiesCommandableGrpcServiceV1 = ActivitiesCommandableGrpcServiceV1;
//# sourceMappingURL=ActivitiesCommandableGrpcServiceV1.js.map