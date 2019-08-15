import {Injectable, Injector} from '@angular/core';
import {AbstractParser} from '../../parser/abstract-parser';
import {JsonParser} from '../../parser/json.parser';
import {ParserMustDeriveFromAbstractParser} from '../../error/parser-must-derive-from-abstract-parser.error';
import {configuration, EntityManagerModuleConfiguration} from '../../entity-manager.module';

@Injectable({
  providedIn: 'root'
})
export class EntityManagerParserService {

  configuration: EntityManagerModuleConfiguration;

  public constructor() {
    this.configuration = configuration;
  }

  public getParser(): AbstractParser {
    const parserType: any = configuration.parser || JsonParser,
      parser = new parserType();

    if ( !(parser instanceof AbstractParser) ) {
      throw new ParserMustDeriveFromAbstractParser(parser);
    }

    return parser;
  }
}
