const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { PartyActivityV1 } from '../../../src/data/version1/PartyActivityV1';
import { ActivitiesMemoryPersistence } from '../../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../../../src/logic/ActivitiesController';
import { ActivitiesCommandableHttpServiceV1 } from '../../../src/services/version1/ActivitiesCommandableHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('ActivitiesCommandableHttpServiceV1', ()=> {
    let service: ActivitiesCommandableHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new ActivitiesMemoryPersistence();
        let controller = new ActivitiesController();

        service = new ActivitiesCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-activities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-activities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-activities', 'service', 'commnadable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('Batch Party Activities', async () => {
        // Log an activity batch
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/activities/batch_party_activities',
                {
                    activities: [
                        ACTIVITY,
                        ACTIVITY,
                        ACTIVITY
                    ]
                },
                (err, req, res) => {
                    if (err == null) resolve(null);
                    else reject(err);
                }
            );
        });
        
        // Get activities
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/activities/get_party_activities',
                {
                    filter: null,
                    paging: null
                },
                (err, req, res, page) => {
                    if (err == null) resolve(page);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.isTrue(page.data.length > 2);

        let activity = page.data[0];
        assert.equal(activity.type, ACTIVITY.type);
        assert.isNotNull(activity.time);
        assert.equal(activity.party.name, ACTIVITY.party.name);
    });
    
});