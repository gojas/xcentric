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

    const user = new User().setName('One').setId(1);
    this.em.persist(user);
    user.setName('CHANGED');
    this.em.persist(user);

    const user2 = new User().setName('Two');
    this.em.persist(user2);

    this.em.flush()
        .subscribe((yo) => {
          console.log(yo);
        });

    this.em.getRepository(User)
      .findOneUserById(1)
      .subscribe((foundUser: User) => {
        console.log(foundUser.getId(), foundUser.getName());
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
