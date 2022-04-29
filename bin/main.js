let ActivitiesProcess = require('../obj/src/container/ActivitiesProcess').ActivitiesProcess;

try {
    new ActivitiesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
