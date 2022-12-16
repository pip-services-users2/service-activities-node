"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class ActivitiesCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/activities');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-activities', 'controller', 'default', '*', '1.0'));
    }
}
exports.ActivitiesCommandableHttpServiceV1 = ActivitiesCommandableHttpServiceV1;
//# sourceMappingURL=ActivitiesCommandableHttpServiceV1.js.map