import { RouteNotDefined } from './error/route-not-defined.error';

export function Route(route: string) {
    let constructor = null;

    var f : any = function (...args) {
        constructor = args[0];

        if (constructor && '' === route) {
            throw new RouteNotDefined(constructor);
        }

        if (constructor) {
            constructor.meta = constructor.meta || {};

            constructor.meta['route'] = route;
        }
    }

    return f;
}
