import {Route} from 'xcentric';

@Route('log')
export class Log {

  public date: Date;

  public setDate(date: Date): Log {
    this.date = date;
    return this;
  }

  public getDate(): Date {
    return this.date;
  }
}
