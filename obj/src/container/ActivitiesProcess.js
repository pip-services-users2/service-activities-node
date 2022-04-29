"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const ActivitiesServiceFactory_1 = require("../build/ActivitiesServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class ActivitiesProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("activities", "Party activities microservice");
        this._factories.add(new ActivitiesServiceFactory_1.ActivitiesServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.ActivitiesProcess = ActivitiesProcess;
//# sourceMappingURL=ActivitiesProcess.js.map