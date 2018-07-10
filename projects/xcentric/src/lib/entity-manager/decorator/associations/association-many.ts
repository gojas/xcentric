import 'reflect-metadata';
import {Meta} from '../../service/meta/meta';
import {EntityManagerMetaDataService} from '../../service/meta/entity-manager-meta-data.service';

export function AssociationMany(associatedEntity: Object): Function {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const meta = new EntityManagerMetaDataService();

        meta.createMetaData(target);

        if (!meta.hasMetaDataProperty(target, Meta.META_ASSOCIATIONS_MANY)) {
          meta.setMetaDataProperty(target, Meta.META_ASSOCIATIONS_MANY, {});
        }

        target.constructor[Meta.META][Meta.META_ASSOCIATIONS_MANY][propertyKey] = associatedEntity;
    };
}
