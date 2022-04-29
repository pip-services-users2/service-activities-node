// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var activities_v1_pb = require('./activities_v1_pb.js');

function serialize_activities_v1_PartyActivityBatchRequest(arg) {
  if (!(arg instanceof activities_v1_pb.PartyActivityBatchRequest)) {
    throw new Error('Expected argument of type activities_v1.PartyActivityBatchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_v1_PartyActivityBatchRequest(buffer_arg) {
  return activities_v1_pb.PartyActivityBatchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_v1_PartyActivityDeleteRequest(arg) {
  if (!(arg instanceof activities_v1_pb.PartyActivityDeleteRequest)) {
    throw new Error('Expected argument of type activities_v1.PartyActivityDeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_v1_PartyActivityDeleteRequest(buffer_arg) {
  return activities_v1_pb.PartyActivityDeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_v1_PartyActivityLogRequest(arg) {
  if (!(arg instanceof activities_v1_pb.PartyActivityLogRequest)) {
    throw new Error('Expected argument of type activities_v1.PartyActivityLogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_v1_PartyActivityLogRequest(buffer_arg) {
  return activities_v1_pb.PartyActivityLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_v1_PartyActivityObjectReply(arg) {
  if (!(arg instanceof activities_v1_pb.PartyActivityObjectReply)) {
    throw new Error('Expected argument of type activities_v1.PartyActivityObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_v1_PartyActivityObjectReply(buffer_arg) {
  return activities_v1_pb.PartyActivityObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_v1_PartyActivityOnlyErrorReply(arg) {
  if (!(arg instanceof activities_v1_pb.PartyActivityOnlyErrorReply)) {
    throw new Error('Expected argument of type activities_v1.PartyActivityOnlyErrorReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_v1_PartyActivityOnlyErrorReply(buffer_arg) {
  return activities_v1_pb.PartyActivityOnlyErrorReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_v1_PartyActivityPageReply(arg) {
  if (!(arg instanceof activities_v1_pb.PartyActivityPageReply)) {
    throw new Error('Expected argument of type activities_v1.PartyActivityPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_v1_PartyActivityPageReply(buffer_arg) {
  return activities_v1_pb.PartyActivityPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_v1_PartyActivityPageRequest(arg) {
  if (!(arg instanceof activities_v1_pb.PartyActivityPageRequest)) {
    throw new Error('Expected argument of type activities_v1.PartyActivityPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_v1_PartyActivityPageRequest(buffer_arg) {
  return activities_v1_pb.PartyActivityPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The activities service definition.
var ActivitiesService = exports.ActivitiesService = {
  get_party_activities: {
    path: '/activities_v1.Activities/get_party_activities',
    requestStream: false,
    responseStream: false,
    requestType: activities_v1_pb.PartyActivityPageRequest,
    responseType: activities_v1_pb.PartyActivityPageReply,
    requestSerialize: serialize_activities_v1_PartyActivityPageRequest,
    requestDeserialize: deserialize_activities_v1_PartyActivityPageRequest,
    responseSerialize: serialize_activities_v1_PartyActivityPageReply,
    responseDeserialize: deserialize_activities_v1_PartyActivityPageReply,
  },
  log_party_activity: {
    path: '/activities_v1.Activities/log_party_activity',
    requestStream: false,
    responseStream: false,
    requestType: activities_v1_pb.PartyActivityLogRequest,
    responseType: activities_v1_pb.PartyActivityObjectReply,
    requestSerialize: serialize_activities_v1_PartyActivityLogRequest,
    requestDeserialize: deserialize_activities_v1_PartyActivityLogRequest,
    responseSerialize: serialize_activities_v1_PartyActivityObjectReply,
    responseDeserialize: deserialize_activities_v1_PartyActivityObjectReply,
  },
  batch_party_activities: {
    path: '/activities_v1.Activities/batch_party_activities',
    requestStream: false,
    responseStream: false,
    requestType: activities_v1_pb.PartyActivityBatchRequest,
    responseType: activities_v1_pb.PartyActivityOnlyErrorReply,
    requestSerialize: serialize_activities_v1_PartyActivityBatchRequest,
    requestDeserialize: deserialize_activities_v1_PartyActivityBatchRequest,
    responseSerialize: serialize_activities_v1_PartyActivityOnlyErrorReply,
    responseDeserialize: deserialize_activities_v1_PartyActivityOnlyErrorReply,
  },
  delete_party_activities: {
    path: '/activities_v1.Activities/delete_party_activities',
    requestStream: false,
    responseStream: false,
    requestType: activities_v1_pb.PartyActivityDeleteRequest,
    responseType: activities_v1_pb.PartyActivityOnlyErrorReply,
    requestSerialize: serialize_activities_v1_PartyActivityDeleteRequest,
    requestDeserialize: deserialize_activities_v1_PartyActivityDeleteRequest,
    responseSerialize: serialize_activities_v1_PartyActivityOnlyErrorReply,
    responseDeserialize: deserialize_activities_v1_PartyActivityOnlyErrorReply,
  },
};

exports.ActivitiesClient = grpc.makeGenericClientConstructor(ActivitiesService);
