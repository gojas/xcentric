import {Injectable} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {forkJoin} from 'rxjs';
import {Observables} from './observables';
import {UnitOfWorkService} from './unit-of-work.service';
import {EntityManagerEventService, EventType} from './entity-manager-event.service';
import {EntityManagerRepositoryService} from './entity-manager-repository.service';

@Injectable()
export class EntityManagerService {

  private observables: Observables = new Observables();

  public constructor(
    private unitOfWorkService: UnitOfWorkService,
    private event: EntityManagerEventService,
    private repository: EntityManagerRepositoryService
  ) {
  }

  public persist(entity: Object): EntityManagerService {
    this.event.run(entity, EventType.PrePersist);

    this.unitOfWorkService.persist(entity);

    return this;
  }

  public remove(entity: Object): EntityManagerService {
    this.event.run(entity, EventType.PreRemove);

    this.unitOfWorkService.remove(entity);

    return this;
  }

  public flush(): Observable<any> {
    this.event.runPreFlush();

    return this.unitOfWorkService.flush();
  }

  public getRepository(): EntityManagerRepositoryService {
    return this.repository;
  }

  public add(observable: Observable<any>): EntityManagerService {
    this.observables.add(observable);

    return this;
  }

  public collect(): Observable<Observables> {

    return Observable.create(observer => {

      forkJoin(this.observables.getAll())
        .subscribe(
          (observables: Observable<any>[]) => {

            this.observables.clear();

            observer.next(new Observables(observables));
            observer.complete();
          });

      if (this.observables.count() === 0) {
        observer.next([]);
        observer.complete();
      }
    });
  }
}
