# Configuration Guide <br/> Party Activities Microservice

Configuration structure used by this module follows the 
[standard configuration](https://github.com/pip-services/pip-services/blob/master/usage/Configuration.md) 
structure.

Example **config.yml** file:

```yaml
- descriptor: "service-container:container-info:default:default:1.0"
  name: "service-activities"
  description: "Party activities microservice"

- descriptor: "service-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-activities:persistence:file:default:1.0"
  path: "./data/activities.json"

- descriptor: "service-activities:controller:default:default:1.0"

- descriptor: "service-activities:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 3000
```
