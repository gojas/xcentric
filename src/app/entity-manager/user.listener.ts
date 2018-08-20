import {User} from './user';
import {Injectable} from '@angular/core';
import {TestService} from './test.service';
import {EntityManagerService} from 'xcentric';
import {Log} from './log';
import {Listener} from 'xcentric';

@Injectable()
export class UserListener extends Listener {

  public constructor(
    private testService: TestService,
    private entityManager: EntityManagerService
  ) {
    super();
  }

  public onPrePost(entity: Object) {

    if (entity instanceof User) {
      // this.entityManager.persist(new Log().setDate(new Date()));
    }
  }

}
