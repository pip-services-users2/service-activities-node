const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';;

import { PartyActivityV1 } from '../../src/data/version1/PartyActivityV1';
import { IActivitiesPersistence } from '../../src/persistence/IActivitiesPersistence';

let ACTIVITY: PartyActivityV1 = {
    id: null,
    type: 'test',
    time: new Date(),
    party: {
        id: '1',
        type: 'party',
        name: 'Test User'
    },
    ref_item: {
        id: '2',
        type: 'party',
        name: 'Admin User'
    },
    ref_parents: [],
    ref_party: null,
    details: null
};

export class ActivitiesPersistenceFixture {
    private _persistence: IActivitiesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
                
    public async testLogPartyActivities() {
        // Log activity
        let activity = await this._persistence.create(null, ACTIVITY);

        assert.isObject(activity);

        // Check activity
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                id: activity.id
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 1);

        activity = page.data[0];
        assert.isNotNull(activity.time);
        assert.equal(activity.type, ACTIVITY.type);
        assert.equal(activity.party.id, ACTIVITY.party.id);
        assert.equal(activity.party.name, ACTIVITY.party.name);
        assert.equal(activity.ref_item.id, ACTIVITY.ref_item.id);
        assert.equal(activity.ref_item.name, ACTIVITY.ref_item.name);
    }

    public async testGetPartyActivities() {
        // Log activity
        let activity = await this._persistence.create(null, ACTIVITY);

        assert.isObject(activity);

        // Get activities
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                party_id: '1'
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.isTrue(page.data.length > 0);

        activity = page.data[0];
        assert.equal(activity.type, ACTIVITY.type);
        assert.isNotNull(activity.time);
        assert.equal(activity.party.name, ACTIVITY.party.name);
    }

}
