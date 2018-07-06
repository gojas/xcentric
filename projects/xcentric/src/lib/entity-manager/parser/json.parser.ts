import { AbstractParser } from './abstract-parser';

export class JsonParser extends AbstractParser {

  public parseEntity(instance: Object, data: any): Object {
    const parsed = Object.assign(instance, data);

    if (parsed._embedded && parsed._embedded instanceof Object) {
      Object.keys(parsed._embedded).forEach(function(key) {
        parsed[key] = parsed._embedded[key];
      });
    }

    return parsed;
  }
}
