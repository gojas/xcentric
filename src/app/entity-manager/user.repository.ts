import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {EntityRepository} from 'xcentric';

@Injectable()
export class UserRepository extends EntityRepository {

  public findOneUserById(id: number): Observable<Object> {
    console.log('test success');
    return this.find(id);
  }
}
