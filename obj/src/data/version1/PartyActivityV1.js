"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyActivityV1 = void 0;
class PartyActivityV1 {
    constructor(id, type, party, ref_item, ref_parents, ref_party, details) {
        this.id = id;
        this.time = new Date();
        this.type = type;
        this.party = party;
        this.ref_item = ref_item;
        this.ref_parents = ref_parents || [];
        this.ref_party = ref_party;
        this.details = details;
    }
}
exports.PartyActivityV1 = PartyActivityV1;
//# sourceMappingURL=PartyActivityV1.js.map