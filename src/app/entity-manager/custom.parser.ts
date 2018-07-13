import { AbstractParser } from 'xcentric';

export class CustomParser extends AbstractParser {

    public parseEntity(instance: Object, data: any): Object {
        const parsed = Object.assign(instance, data);
    
        console.log("USING CUSTOM PARSER!");

        return parsed;
    }
}