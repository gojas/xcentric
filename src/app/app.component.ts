import {Component} from '@angular/core';
import {EntityManagerService} from 'xcentric';
import {User} from './entity-manager/user';
import {PaginatedMapper} from './entity-manager/paginated.mapper';
import {BuilderResult} from '../../projects/xcentric/src/lib/entity-manager/service/builder/builder';
import {PaginatedModifier} from './entity-manager/paginated.modifier';

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

    // this.em.getRepository(User)
    //  .findMore()
    //  .subscribe((foundUsers: User[]) => {
    //    console.log(foundUsers);
    //  });

    const builder = this.em.getRepository(User).getBuilder();

    builder
      .setParams({
        offset: 0,
        limit: 1
      })
      .setMapper(PaginatedMapper)
      .getMore()
      .subscribe((result: BuilderResult) => {
        console.log(result.getEntities());
      });
  }
}
