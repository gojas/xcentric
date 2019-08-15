export class ParserMustDeriveFromAbstractParser extends Error {
    constructor(parser: any) {
        super(`${parser.constructor.name} must derive from AbstractParser!`);

        Object.setPrototypeOf(this, ParserMustDeriveFromAbstractParser.prototype);
    }
}
