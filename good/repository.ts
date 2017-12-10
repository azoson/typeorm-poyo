import { EntityRepository } from "typeorm";
import { OkWoman } from "./model";
import { Repository } from "typeorm/repository/Repository";

type ColumnsShouldInsert =
    | 'name'
    | 'age'
    | 'birthday'
    | 'ok'
export type InsertableOkWoman = Pick<OkWoman, ColumnsShouldInsert>;

@EntityRepository(OkWoman)
export class OkWomanRepository extends Repository<OkWoman> {

    saveInsertable(entity: InsertableOkWoman) {
        return this.save(entity);
    }

}
