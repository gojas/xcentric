export class NotBlankValidator {

    public validate(value: any) {
        console.log(value);

        return typeof value !== 'undefined' && value !== null && value !== '';
    }
}
