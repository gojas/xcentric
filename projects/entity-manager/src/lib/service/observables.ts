import { Observable } from 'rxjs';

export class Observables {

    private observables: Observable<any>[] = [];

    public constructor(observables: Observable<any>[] = []) {
        this.observables = observables;
    }

    public add(observable: Observable<any>): Observables {
        this.observables.push(observable);
        return this;
    }

    public remove(observable: Observable<any>): Observables {
        // todo

        return this;
    }

    public getAt(index: number): any {
        return this.observables[index];
    }

    public getAll(): Observable<any>[] {
        return this.observables;
    }

    public count(): number {
        return this.observables.length;
    }

    public clear(): Observables {
        this.observables = [];
        return this;
    }
}
