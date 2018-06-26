export class Paginated {

    public data: any[];
    public total: number;

    public constructor(data: any[], total: number) {
        this.data = data;
        this.total = total;
    }

    public setData(data: any[]): Paginated {
        this.data = data;
        return this;
    }

    public getData(): any[] {
        return this.data;
    }

    public setTotal(total: number): Paginated {
        this.total = total;
        return this;
    }

    public getTotal(): number {
        return this.total;
    }
}
