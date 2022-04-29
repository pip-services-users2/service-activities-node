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
exports.ActivitiesMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
class ActivitiesMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.type, search))
            return true;
        if (item.party && this.matchString(item.party.name, search))
            return true;
        if (item.ref_item && this.matchString(item.ref_item.name, search))
            return true;
        if (item.ref_party && this.matchString(item.ref_party.name, search))
            return true;
        if (this.matchString(item.type, search))
            return true;
        return false;
    }
    equalIds(reference, id) {
        return (reference != null) ? reference.id == id : false;
    }
    includeId(references, id) {
        if (references == null)
            return false;
        for (let i = 0; i < references.length; i++) {
            let ref = references[i];
            if (ref && ref.id == id)
                return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id') || filter.getAsNullableString('activity_id');
        let orgId = filter.getAsNullableString('org_id');
        let type = filter.getAsNullableString('type');
        let includeTypes = filter.getAsObject('include_types');
        let excludeTypes = filter.getAsObject('exclude_types');
        let partyId = filter.getAsNullableString('party_id');
        let refParentId = filter.getAsNullableString('ref_parent_id');
        let refPartyId = filter.getAsNullableString('ref_party_id');
        let refItemId = filter.getAsNullableString('ref_item_id');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        // Convert string parameters to arrays
        if (includeTypes && !Array.isArray(includeTypes))
            includeTypes = ('' + includeTypes).split(',');
        if (excludeTypes && !Array.isArray(excludeTypes))
            excludeTypes = ('' + excludeTypes).split(',');
        return (item) => {
            if (search != null && !this.matchSearch(item, search))
                return false;
            if (id != null && id != item.id)
                return false;
            if (orgId != null && orgId != item.org_id)
                return false;
            if (type != null && type != item.type)
                return false;
            if (includeTypes && !includeTypes.includes(item.id))
                return false;
            if (excludeTypes && includeTypes.includes(item.id))
                return false;
            if (refParentId && !this.includeId(item.ref_parents, refParentId))
                return false;
            if (refItemId && !this.includeId(item.ref_parents, refItemId))
                return false;
            if (partyId && !this.equalIds(item.party, partyId))
                return false;
            if (refPartyId && !this.equalIds(item.ref_party, refPartyId))
                return false;
            if (refItemId && !this.equalIds(item.ref_item, refItemId))
                return false;
            if (fromTime != null && item.time >= fromTime)
                return false;
            if (toTime != null && item.time < toTime)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
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
            this._items = this._items.filter(this.composeFilter(filter));
        });
    }
}
exports.ActivitiesMemoryPersistence = ActivitiesMemoryPersistence;
//# sourceMappingURL=ActivitiesMemoryPersistence.js.map