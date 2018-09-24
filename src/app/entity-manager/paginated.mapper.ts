import {Injectable} from '@angular/core';
import {Mapper} from 'xcentric';

@Injectable()
export class PaginatedMapper extends Mapper {

  public map(data: any): any {
    return data; // hm :D, no real example. so just return data
  }
}
