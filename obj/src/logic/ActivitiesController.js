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
exports.ActivitiesController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const ActivitiesCommandSet_1 = require("./ActivitiesCommandSet");
class ActivitiesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(ActivitiesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ActivitiesCommandSet_1.ActivitiesCommandSet(this);
        return this._commandSet;
    }
    getPartyActivities(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    logPartyActivity(correlationId, activity) {
        return __awaiter(this, void 0, void 0, function* () {
            activity.time = pip_services3_commons_nodex_3.DateTimeConverter.toNullableDateTime(activity.time);
            activity.time = activity.time || new Date();
            return yield this._persistence.create(correlationId, activity);
        });
    }
    batchPartyActivities(correlationId, activities) {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = [];
            for (let activity of activities)
                tasks.push(this._persistence.create(correlationId, activity));
            yield Promise.all(tasks);
        });
    }
    deletePartyActivities(correlationId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._persistence.deleteByFilter(correlationId, filter);
        });
    }
}
exports.ActivitiesController = ActivitiesController;
ActivitiesController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-activities:persistence:*:*:1.0');
//# sourceMappingURL=ActivitiesController.js.map