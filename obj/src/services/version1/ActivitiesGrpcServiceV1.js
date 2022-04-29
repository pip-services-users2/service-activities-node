"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesGrpcServiceV1 = void 0;
const services = require('../../../../src/protos/activities_v1_grpc_pb');
const messages = require('../../../../src/protos/activities_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const ActivitiesGrpcConverterV1_1 = require("./ActivitiesGrpcConverterV1");
class ActivitiesGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.ActivitiesService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-activities", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getPartyActivities(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_2.FilterParams();
            ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.PartyActivityPageReply();
            try {
                let result = yield this._controller.getPartyActivities(correlationId, filter, paging);
                let page = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromPartyActivityPage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    logPartyActivity(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let activity = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.toPartyActivity(call.request.getActivity());
            let response = new messages.PartyActivityObjectReply();
            try {
                let result = yield this._controller.logPartyActivity(correlationId, activity);
                activity = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromPartyActivity(result);
                if (result)
                    response.setPartyActivity(activity);
            }
            catch (err) {
                let error = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    batchPartyActivities(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let activities = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.toPartyActivities(call.request.getActivitiesList());
            let response = new messages.PartyActivityOnlyErrorReply();
            try {
                yield this._controller.batchPartyActivities(correlationId, activities);
            }
            catch (err) {
                let error = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    deletePartyActivities(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = pip_services3_commons_nodex_2.FilterParams.fromValue(call.request.filterMap);
            let response = new messages.PartyActivityOnlyErrorReply();
            try {
                yield this._controller.deletePartyActivities(correlationId, filter);
            }
            catch (err) {
                let error = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_party_activities', null, this.getPartyActivities);
        this.registerMethod('log_party_activity', null, this.logPartyActivity);
        this.registerMethod('batch_party_activities', null, this.batchPartyActivities);
        this.registerMethod('delete_party_activities', null, this.deletePartyActivities);
    }
}
exports.ActivitiesGrpcServiceV1 = ActivitiesGrpcServiceV1;
//# sourceMappingURL=ActivitiesGrpcServiceV1.js.map