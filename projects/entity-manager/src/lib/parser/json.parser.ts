import { AbstractParser } from './abstract-parser';

export class JsonParser extends AbstractParser {

  public parseEntity(instance: any, data: any): any {
    const parsed = Object.assign(instance, data);

    return parsed;
  }
}
