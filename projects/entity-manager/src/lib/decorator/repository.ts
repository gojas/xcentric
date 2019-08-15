import {RepositoryNotDefined} from './error/repository-not-defined.error';
import {Meta} from '../service/meta/meta';
import {EntityManagerMetaDataService} from '../service/meta/entity-manager-meta-data.service';

export function Repository(repository: any) {
    let target = null;

    return (...args) => {
        target = args[0].prototype;

        const metaService = new EntityManagerMetaDataService();

        if (target && '' === repository) {
            throw new RepositoryNotDefined(target);
        }

        if (target) {
            metaService.createMetaData(target)
                .setMetaDataProperty(target, Meta.META_REPOSITORY, repository);;
        }
    };
}
