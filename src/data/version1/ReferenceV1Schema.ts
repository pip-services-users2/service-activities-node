import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class ReferenceV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('id', TypeCode.String);
        this.withRequiredProperty('type', TypeCode.String);
        this.withOptionalProperty('name', TypeCode.String);
    }
}
