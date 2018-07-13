export class ParserMustDeriveFromAbstractParser extends Error {
    constructor(parser: Object) {
        super(`${parser.constructor.name} must derive from AbstractParser!`);

        Object.setPrototypeOf(this, ParserMustDeriveFromAbstractParser.prototype);
    }
}
