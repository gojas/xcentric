import {RouteNotDefined} from './error/route-not-defined.error';
import {Meta} from '../service/meta/meta';
import {EntityManagerMetaDataService} from '../service/meta/entity-manager-meta-data.service';

export function Route(route: string) {
    let target = null;

    return (...args) => {
        target = args[0].prototype;

        const metaService = new EntityManagerMetaDataService();

        if (target && '' === route) {
            throw new RouteNotDefined(target);
        }

        if (target) {
            metaService.createMetaData(target)
                .setMetaDataProperty(target, Meta.META_ROUTE, route);
        }
    };
}
