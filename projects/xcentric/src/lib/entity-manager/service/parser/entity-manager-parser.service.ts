import {Injectable, Injector} from '@angular/core';
import {configuration, EntityManagerModuleConfiguration} from '../../xcentric.entity-manager.module';
import {AbstractParser} from '../../parser/abstract-parser';
import {JsonParser} from '../../parser/json.parser';
import {ParserMustDeriveFromAbstractParser} from '../../error/parser-must-derive-from-abstract-parser.error';

@Injectable()
export class EntityManagerParserService {

  configuration: EntityManagerModuleConfiguration;

  public constructor() {
    this.configuration = configuration;
  }

  public getParser(): AbstractParser {
    const parser: any = configuration.parser || JsonParser;

    if ( !(parser instanceof AbstractParser) ) {
      console.error(`${parser.constructor.name} must derive from AbstractParser!`);
      //throw new ParserMustDeriveFromAbstractParser(parser);
    }

    return new parser();
  }
}
