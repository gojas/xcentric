import { Entity } from '../service/entity';

export interface Parser {
    parse(instance: Entity, data: any): Entity;
}