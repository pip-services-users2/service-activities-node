let ActivitiesLambdaFunction = require('../obj/src/container/ActivitiesLambdaFunction').ActivitiesLambdaFunction;

module.exports = new ActivitiesLambdaFunction().getHandler();