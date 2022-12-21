# Party Activities Microservice

This is a party activity logging microservice from Pip.Services library. 
It logs important party activities like signups, signins, 
creation, changes or deletion of data items and so on.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-users2/client-activities-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class PartyActivityV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;

    /* Identification fields */
    public time: Date;
    public type: string;
    public party: ReferenceV1;

    /* References objects (notes, goals, etc.) */
    public ref_item: ReferenceV1;
    public ref_parents: ReferenceV1[];
    public ref_party: ReferenceV1;

    /* Other details like % of progress or new status */
    public details: StringValueMap;
}

class ReferenceV1 {
    public id: string;
    public type: string;
    public name?: string;
}

interface IActivitiesV1 {
    getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PartyActivityV1>>;

    logPartyActivity(correlationId: string, activity: PartyActivityV1): Promise<PartyActivityV1>;

    batchPartyActivities(correlationId: string, activities: PartyActivityV1[]): Promise<void>;

    deletePartyActivities(correlationId: string, filter: FilterParams): Promise<void>;
}

```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-users2/service-activities-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "service-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-activities:persistence:file:default:1.0"
  path: "./data/activities.json"

- descriptor: "service-activities:controller:default:default:1.0"

- descriptor: "service-activities:service:commandable-http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-activities-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('client-activities-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
let client = sdk.ActivitiesHttpClient(config);

// Connect to the microservice
try {
    await client.open(null);
    
    // Work with the microservice
    ...
}
catch (err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Log party activity
let activity = await client.logPartyActivity(
    null,
    { 
        type: 'signup',
        party: {
            id: '123',
            name: 'Test User'
        }
    }
);
```

```javascript
let now = new Date();

// Get the list system activities
let page = await client.getPartyActivities(
    null,
    {
        party_id: '123',
        from_time: new Date(now.getTime() - 24 * 3600 * 1000),
        to_time: now
    },
    {
        total: true,
        skip: 0,
        take: 10
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

