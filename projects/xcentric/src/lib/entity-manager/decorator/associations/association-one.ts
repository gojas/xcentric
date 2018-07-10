import 'reflect-metadata';
import {EntityManagerMetaDataService} from '../../service/meta/entity-manager-meta-data.service';
import {Meta} from '../../service/meta/meta';

export function AssociationOne(associatedEntity: Object): Function {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const meta = new EntityManagerMetaDataService();

      meta.createMetaData(target);

      if (!meta.hasMetaDataProperty(target, Meta.META_ASSOCIATIONS)) {
        meta.setMetaDataProperty(target, Meta.META_ASSOCIATIONS, {});
      }

      target.constructor[Meta.META][Meta.META_ASSOCIATIONS][propertyKey] = associatedEntity;
    };
}
