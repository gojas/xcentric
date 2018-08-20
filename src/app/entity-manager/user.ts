import {Route, Repository} from 'xcentric';
import {Log} from './log';
import {AssociationOne} from '../../../projects/xcentric/src/lib/entity-manager/decorator/associations/association-one';
import {UserRepository} from './user.repository';

@Route('app/users')
@Repository(UserRepository)
export class User {

  public id: number;
  public firstName: string;

  @AssociationOne(Log)
  public log: Log;

  public setId(id: number): User {
    this.id = id;
    return this;
  }

  public getId(): number {
    return this.id;
  }

  public setFirstName(name: string): User {
    this.firstName = name;
    return this;
  }

  public getFirstName(): string {
    return this.firstName;
  }
}
