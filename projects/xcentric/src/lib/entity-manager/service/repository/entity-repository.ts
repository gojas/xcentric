import {EntityManagerRepositoryService} from '../entity-manager-repository.service';
import {Observable} from 'rxjs';

export interface RepositoryAware {
    repository: EntityManagerRepositoryService;
}

export interface EntityTypeAware {
    entityType: any;
}

export class EntityRepository implements RepositoryAware, EntityTypeAware {
    
    public entityType: any;
    public repository: EntityManagerRepositoryService;

    public find(id: number): Observable<Object> {
        return this.repository.find(this.entityType, id);
    }

    public findOne(params: any): Observable<Object> {
        return this.repository.findOne(this.entityType, params);
    }
  
    public findMore(params: any): Observable<Object[]> {
        return this.repository.findMore(this.entityType, params);
    }
}
