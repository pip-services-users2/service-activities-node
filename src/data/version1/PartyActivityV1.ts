import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { StringValueMap } from 'pip-services3-commons-nodex';

import { ReferenceV1 } from './ReferenceV1';

export class PartyActivityV1 implements IStringIdentifiable {
    public constructor(id: string, type: string, party: ReferenceV1,
        ref_item?: ReferenceV1, ref_parents?: ReferenceV1[], 
        ref_party?: ReferenceV1, details?: StringValueMap) {
        this.id = id;
        this.time = new Date();
        this.type = type;
        this.party = party;
        this.ref_item = ref_item;
        this.ref_parents = ref_parents || [];
        this.ref_party = ref_party;
        this.details = details;
    }

    /* Identification */
    public id: string;
    public org_id?: string;

    /* Identification fields */
    public time: Date;
    public type: string;
    public party: ReferenceV1;

    /* References objects (notes, goals, etc.) */
    public ref_item?: ReferenceV1;
    public ref_parents?: ReferenceV1[];
    public ref_party?: ReferenceV1;

    /* Other details like % of progress or new status */
    public details?: StringValueMap;
}