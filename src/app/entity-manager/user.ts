import {Route, Repository} from 'xcentric';
import {Log} from './log';
import {AssociationOne} from '../../../projects/xcentric/src/lib/entity-manager/decorator/associations/association-one';
import {UserRepository} from './user.repository';

@Route('app/users')
@Repository(UserRepository)
export class User {

  public id: number;
  public name: string;

  @AssociationOne(Log)
  public log: Log;

  public setId(id: number): User {
    this.id = id;
    return this;
  }

  public getId(): number {
    return this.id;
  }

  public setName(name: string): User {
    this.name = name;
    return this;
  }

  public getName(): string {
    return this.name;
  }
}
