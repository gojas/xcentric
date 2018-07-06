import {User} from './user';

export class PreUserUpdateListener {

  public onPreUpdate(entity: Object) {

    if (entity instanceof User) {
      console.log(entity);
    }
  }

}
