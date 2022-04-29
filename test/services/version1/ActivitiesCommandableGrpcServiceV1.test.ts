const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { PartyActivityV1 } from '../../../src/data/version1/PartyActivityV1';
import { ActivitiesMemoryPersistence } from '../../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../../../src/logic/ActivitiesController';
import { ActivitiesCommandableGrpcServiceV1 } from '../../../src/services/version1/ActivitiesCommandableGrpcServiceV1';

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


suite('ActivitiesCommandableGrpcServiceV1', () => {
    let service: ActivitiesCommandableGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new ActivitiesMemoryPersistence();
        let controller = new ActivitiesController();

        service = new ActivitiesCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-activities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-activities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-activities', 'service', 'commandable-grpc', 'default', '1.0'), service
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
            __dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Batch Party Activities', async () => {
        // Log an activity batch
        let response = await new Promise<any>((resolve, reject) => { 
            client.invoke(
                {
                    method: 'v1/activities.batch_party_activities',
                    args_empty: false,
                    args_json: JSON.stringify({
                        activities: [ACTIVITY]
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isTrue(response.result_empty);

        // Get activities
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/activities.get_party_activities',
                    args_empty: false,
                    args_json: JSON.stringify({
                        filter: null,
                        paging: null
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let page = JSON.parse(response.result_json);

        assert.isObject(page);
        assert.equal(page.data.length, 1);

        let activity = page.data[0];
        assert.equal(activity.type, ACTIVITY.type);
        assert.isNotNull(activity.time);
        assert.equal(activity.party.name, ACTIVITY.party.name);
    });

});