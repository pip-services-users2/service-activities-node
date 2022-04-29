import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { PartyActivityV1 } from '../data/version1/PartyActivityV1';
import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { IActivitiesPersistence } from './IActivitiesPersistence';

export class ActivitiesMemoryPersistence 
    extends IdentifiableMemoryPersistence<PartyActivityV1, string> 
    implements IActivitiesPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: PartyActivityV1, search: string): boolean {
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

    private equalIds(reference: ReferenceV1, id: string) {
        return (reference != null) ? reference.id == id : false;
    }

    private includeId(references: ReferenceV1[], id: string) {
        if (references == null) return false;
        for (let i = 0; i < references.length; i++) {
            let ref = references[i];
            if (ref && ref.id == id) return true;
        }
        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
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

        return (item: PartyActivityV1) => {
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

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PartyActivityV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async create(correlationId: string, item: PartyActivityV1): Promise<PartyActivityV1> {
        item.ref_parents = item.ref_parents || [];
        if (item.ref_item)
            item.ref_parents.push(item.ref_item);
        return await super.create(correlationId, item);
    }

    public async deleteByFilter(correlationId: string, filter: FilterParams): Promise<void> {
        this._items = this._items.filter(this.composeFilter(filter));
    }
}
