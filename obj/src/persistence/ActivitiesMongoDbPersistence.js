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
exports.ActivitiesMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class ActivitiesMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('party_activities');
        super.ensureIndex({ time: -1 });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ type: { $regex: searchRegex } });
            searchCriteria.push({ 'party.name': { $regex: searchRegex } });
            searchCriteria.push({ 'ref_item.name': { $regex: searchRegex } });
            searchCriteria.push({ 'ref_party.name': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id') || filter.getAsNullableString('activity_id');
        if (id != null)
            criteria.push({ _id: id });
        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null)
            criteria.push({ org_id: orgId });
        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });
        // Decode include types
        let includeTypes = filter.getAsObject('include_types');
        if (includeTypes) {
            if (Array.isArray(includeTypes))
                includeTypes = ('' + includeTypes).split(',');
            criteria.push({ type: { $in: includeTypes } });
        }
        // Decode exclude types
        let excludeTypes = filter.getAsObject('exclude_types');
        if (excludeTypes) {
            if (Array.isArray(excludeTypes))
                excludeTypes = ('' + excludeTypes).split(',');
            criteria.push({ type: { $nin: excludeTypes } });
        }
        // Decode party_id
        let partyId = filter.getAsNullableString('party_id');
        if (partyId)
            criteria.push({ 'party.id': partyId });
        // Decode ref_item_id
        let refItemId = filter.getAsNullableString('ref_item_id');
        if (refItemId)
            criteria.push({ 'ref_item.id': refItemId });
        // Decode ref_parent_id and ref_item_id
        let refParentId = filter.getAsNullableString('ref_parent_id');
        if (refParentId)
            criteria.push({ 'ref_parents.id': refParentId });
        // Decode party
        let refPartyId = filter.getAsNullableString('ref_party_id');
        if (refPartyId)
            criteria.push({ 'ref_party.id': refPartyId });
        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ time: { $gte: fromTime } });
        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ time: { $lt: toTime } });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = this.composeFilter(filter);
            return yield _super.getPageByFilter.call(this, correlationId, criteria, paging, '-time', { parent_ids: 0 });
        });
    }
    create(correlationId, item) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            item.ref_parents = item.ref_parents || [];
            if (item.ref_item)
                item.ref_parents.push(item.ref_item);
            return yield _super.create.call(this, correlationId, item);
        });
    }
    deleteByFilter(correlationId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = this.composeFilter(filter);
            yield this._collection.remove(criteria, { multi: true });
        });
    }
}
exports.ActivitiesMongoDbPersistence = ActivitiesMongoDbPersistence;
//# sourceMappingURL=ActivitiesMongoDbPersistence.js.map