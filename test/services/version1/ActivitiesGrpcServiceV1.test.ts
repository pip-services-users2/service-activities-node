const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { PartyActivityV1 } from '../../../src/data/version1/PartyActivityV1';
import { ActivitiesMemoryPersistence } from '../../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../../../src/logic/ActivitiesController';
import { ActivitiesGrpcServiceV1 } from '../../../src/services/version1/ActivitiesGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
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


suite('ActivitiesGrpcServiceV1', () => {
    let service: ActivitiesGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new ActivitiesMemoryPersistence();
        let controller = new ActivitiesController();

        service = new ActivitiesGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-activities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-activities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-activities', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });

    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/activities_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).activities_v1.Activities;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Batch Party Activities', async () => {
        // Log an activity batch
        await new Promise<any>((resolve, reject) => {
            client.batch_party_activities(
                {
                    activities: [ACTIVITY]
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        // Get activities
        let response = await new Promise<any>((resolve, reject) => {
            client.get_party_activities(
                {
                    filter: null,
                    paging: null
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let page = response ? response.page : null;

        assert.isObject(page);
        assert.equal(page.data.length, 1);

        let activity = page.data[0];
        assert.equal(activity.type, ACTIVITY.type);
        assert.isNotNull(activity.time);
        assert.equal(activity.party.name, ACTIVITY.party.name);

    });
});