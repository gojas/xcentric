import { AbstractParser } from './abstract-parser';

export class JsonParser extends AbstractParser {

  public parseEntity(instance: Object, data: any): Object {
    const parsed = Object.assign(instance, data);

    return parsed;
  }
}
