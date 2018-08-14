import {Injectable, Injector} from '@angular/core';
import {configuration, EntityManagerModuleConfiguration} from '../../xcentric.entity-manager.module';
import {RepositoryMustDeriveFromEntityRepository} from '../../error/repository-must-derive-from-entity-repository.error';
import {EntityRepository} from './entity-repository';

@Injectable()
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
