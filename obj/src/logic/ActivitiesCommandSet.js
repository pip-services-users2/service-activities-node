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
exports.ActivitiesCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_9 = require("pip-services3-commons-nodex");
const PartyActivityV1Schema_1 = require("../data/version1/PartyActivityV1Schema");
class ActivitiesCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetPartyActivitiesCommand());
        this.addCommand(this.makeLogPartyActivityCommand());
        this.addCommand(this.makeBatchPartyActivitiesCommand());
        this.addCommand(this.makeDeletePartyActivitiesCommand());
    }
    makeGetPartyActivitiesCommand() {
        return new pip_services3_commons_nodex_2.Command("get_party_activities", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getPartyActivities(correlationId, filter, paging);
        }));
    }
    makeLogPartyActivityCommand() {
        return new pip_services3_commons_nodex_2.Command("log_party_activity", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('activity', new PartyActivityV1Schema_1.PartyActivityV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let activity = args.get("activity");
            activity.time = pip_services3_commons_nodex_9.DateTimeConverter.toNullableDateTime(activity.time);
            return yield this._logic.logPartyActivity(correlationId, activity);
        }));
    }
    makeBatchPartyActivitiesCommand() {
        return new pip_services3_commons_nodex_2.Command("batch_party_activities", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('activities', new pip_services3_commons_nodex_6.ArraySchema(new PartyActivityV1Schema_1.PartyActivityV1Schema())), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let activities = args.getAsArray("activities");
            activities.forEach((a) => {
                a.time = pip_services3_commons_nodex_9.DateTimeConverter.toNullableDateTime(a.time);
            });
            return yield this._logic.batchPartyActivities(correlationId, activities);
        }));
    }
    makeDeletePartyActivitiesCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_party_activities", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            return yield this._logic.deletePartyActivities(correlationId, filter);
        }));
    }
}
exports.ActivitiesCommandSet = ActivitiesCommandSet;
//# sourceMappingURL=ActivitiesCommandSet.js.map