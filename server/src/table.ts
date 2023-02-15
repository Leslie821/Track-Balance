import knex from "knex";

export class Table {
    constructor(public name: string) { }

    async insert(row: object) {
        let rows = await knex(this.name).insert(row)
            .returning('id')
        return rows[0]
    }
}