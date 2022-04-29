const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { PartyActivityV1 } from '../../src/data/version1/PartyActivityV1';
import { ActivitiesLambdaFunction } from '../../src/container/ActivitiesLambdaFunction';

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

suite('ActivitiesLambdaFunction', ()=> {
    let lambda: ActivitiesLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-activities:persistence:memory:default:1.0',
            'controller.descriptor', 'service-activities:controller:default:default:1.0'
        );

        lambda = new ActivitiesLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('Batch Party Activities', async () => {
        // Log an activity batch
        await lambda.act(
            {
                role: 'activities',
                cmd: 'batch_party_activities',

                activities: [
                    ACTIVITY,
                    ACTIVITY,
                    ACTIVITY
                ]
            }
        );

        // Get activities
        let page = await lambda.act(
            {
                role: 'activities',
                cmd: 'get_party_activities',
                filter: {
                    party_id: '1'
                }
            }
        );

        assert.isObject(page);
        assert.isTrue(page.data.length > 2);

        let activity = page.data[0];
        assert.equal(activity.type, ACTIVITY.type);
        assert.isNotNull(activity.time);
        assert.equal(activity.party.name, ACTIVITY.party.name);
    });
});