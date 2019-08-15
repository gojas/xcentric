import {Injectable, Injector} from '@angular/core';
import {RepositoryMustDeriveFromEntityRepository} from '../../error/repository-must-derive-from-entity-repository.error';
import {EntityRepository} from './entity-repository';
import {configuration, EntityManagerModuleConfiguration} from '../../entity-manager.module';

@Injectable({
    providedIn: 'root'
})
export class EntityManagerRepositoryFactoryService {

    private configuration: EntityManagerModuleConfiguration;

    public constructor(
        private injector: Injector
    ) {
      this.configuration = configuration;
    }

    public createRepository(entityType: any): EntityRepository|any {
        const repositoriesTypes = this.configuration.repositories || [];

        let repository = this.injector.get(EntityRepository);

        for (const repositoryType of repositoriesTypes) {
            if (entityType.constructor.name === repositoryType.constructor.name) {
                repository = this.injector.get(repositoryType);
            }
        }

        if ( !(repository instanceof EntityRepository) ) {
           throw new RepositoryMustDeriveFromEntityRepository(repository);
        }

        repository.entityType = entityType;

        return repository;
    }
}
