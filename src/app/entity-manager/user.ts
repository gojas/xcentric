import {Route} from 'xcentric';

@Route('users')
export class User {

  public id: number;
  public name: string;

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
