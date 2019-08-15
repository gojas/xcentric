export class RepositoryMustDeriveFromEntityRepository extends Error {
    constructor(repository: any) {
        super(`${repository.constructor.name} must derive from EntityRepository!`);

        Object.setPrototypeOf(this, RepositoryMustDeriveFromEntityRepository.prototype);
    }
}
