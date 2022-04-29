import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { ActivitiesMongoDbPersistence } from '../persistence/ActivitiesMongoDbPersistence';
import { ActivitiesFilePersistence } from '../persistence/ActivitiesFilePersistence';
import { ActivitiesMemoryPersistence } from '../persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../logic/ActivitiesController';
import { ActivitiesHttpServiceV1 } from '../services/version1/ActivitiesHttpServiceV1';
import { ActivitiesGrpcServiceV1 } from '../services/version1/ActivitiesGrpcServiceV1';
import { ActivitiesCommandableGrpcServiceV1 } from '../services/version1/ActivitiesCommandableGrpcServiceV1';

export class ActivitiesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-activities", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-activities", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-activities", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-activities", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-activities", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-activities", "service", "http", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-activities", "service", "grpc", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-activities", "service", "commandable-grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ActivitiesServiceFactory.MemoryPersistenceDescriptor, ActivitiesMemoryPersistence);
		this.registerAsType(ActivitiesServiceFactory.FilePersistenceDescriptor, ActivitiesFilePersistence);
		this.registerAsType(ActivitiesServiceFactory.MongoDbPersistenceDescriptor, ActivitiesMongoDbPersistence);
		this.registerAsType(ActivitiesServiceFactory.ControllerDescriptor, ActivitiesController);
		this.registerAsType(ActivitiesServiceFactory.HttpServiceDescriptor, ActivitiesHttpServiceV1);
		this.registerAsType(ActivitiesServiceFactory.GrpcServiceDescriptor, ActivitiesGrpcServiceV1);
		this.registerAsType(ActivitiesServiceFactory.CommandableGrpcServiceDescriptor, ActivitiesCommandableGrpcServiceV1);
	}
	
}
