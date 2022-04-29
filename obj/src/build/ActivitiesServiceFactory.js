"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const ActivitiesMongoDbPersistence_1 = require("../persistence/ActivitiesMongoDbPersistence");
const ActivitiesFilePersistence_1 = require("../persistence/ActivitiesFilePersistence");
const ActivitiesMemoryPersistence_1 = require("../persistence/ActivitiesMemoryPersistence");
const ActivitiesController_1 = require("../logic/ActivitiesController");
const ActivitiesHttpServiceV1_1 = require("../services/version1/ActivitiesHttpServiceV1");
const ActivitiesGrpcServiceV1_1 = require("../services/version1/ActivitiesGrpcServiceV1");
const ActivitiesCommandableGrpcServiceV1_1 = require("../services/version1/ActivitiesCommandableGrpcServiceV1");
class ActivitiesServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(ActivitiesServiceFactory.MemoryPersistenceDescriptor, ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence);
        this.registerAsType(ActivitiesServiceFactory.FilePersistenceDescriptor, ActivitiesFilePersistence_1.ActivitiesFilePersistence);
        this.registerAsType(ActivitiesServiceFactory.MongoDbPersistenceDescriptor, ActivitiesMongoDbPersistence_1.ActivitiesMongoDbPersistence);
        this.registerAsType(ActivitiesServiceFactory.ControllerDescriptor, ActivitiesController_1.ActivitiesController);
        this.registerAsType(ActivitiesServiceFactory.HttpServiceDescriptor, ActivitiesHttpServiceV1_1.ActivitiesHttpServiceV1);
        this.registerAsType(ActivitiesServiceFactory.GrpcServiceDescriptor, ActivitiesGrpcServiceV1_1.ActivitiesGrpcServiceV1);
        this.registerAsType(ActivitiesServiceFactory.CommandableGrpcServiceDescriptor, ActivitiesCommandableGrpcServiceV1_1.ActivitiesCommandableGrpcServiceV1);
    }
}
exports.ActivitiesServiceFactory = ActivitiesServiceFactory;
ActivitiesServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-activities", "factory", "default", "default", "1.0");
ActivitiesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-activities", "persistence", "memory", "*", "1.0");
ActivitiesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-activities", "persistence", "file", "*", "1.0");
ActivitiesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-activities", "persistence", "mongodb", "*", "1.0");
ActivitiesServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-activities", "controller", "default", "*", "1.0");
ActivitiesServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-activities", "service", "http", "*", "1.0");
ActivitiesServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-activities", "service", "grpc", "*", "1.0");
ActivitiesServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-activities", "service", "commandable-grpc", "*", "1.0");
//# sourceMappingURL=ActivitiesServiceFactory.js.map