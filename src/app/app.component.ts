import {Component} from '@angular/core';
import {EntityManagerService} from 'xcentric';
import {User} from './entity-manager/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public constructor(
    private em: EntityManagerService
  ) {

    const user = new User().setFirstName('One').setId(1);
    this.em.persist(user);
    user.setFirstName('CHANGED');
    this.em.persist(user);

    const user2 = new User().setFirstName('Two');
    this.em.persist(user2);

    this.em.flush()
        .subscribe((entities) => {
          console.log(entities, user, user2);
        });

    this.em.getRepository(User)
      .findOneUserById(1)
      .subscribe((foundUser: User) => {
        console.log(foundUser.getId(), foundUser.getFirstName());
      });
    /**
    this.em.getRepository(User).findMore({
      limit: 50
    }).subscribe((users: User[]) => {
      console.log(users);
    });
 **/
  }
}
