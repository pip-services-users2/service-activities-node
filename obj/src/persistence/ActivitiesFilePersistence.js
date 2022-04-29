"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const ActivitiesMemoryPersistence_1 = require("./ActivitiesMemoryPersistence");
class ActivitiesFilePersistence extends ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.ActivitiesFilePersistence = ActivitiesFilePersistence;
//# sourceMappingURL=ActivitiesFilePersistence.js.map