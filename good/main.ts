import { createConnection } from "typeorm";
import { config } from "./typeorm.config";
import { OkWoman } from "./model";

type InsertableColumns =
    | 'name'
    | 'age'
    | 'birthday'
    | 'ok'
const noOkWomanToInsert: Pick<OkWoman, InsertableColumns> = {
    name: 'pipimi',
    age: 18,
    birthday: new Date('2017/12/09'),
    ok: true,
}

async function main() {
    const conn = await createConnection(config);
    console.log('connected mysql');
    const repo = conn.getRepository(OkWoman);
    await repo.save(noOkWomanToInsert);
    const record = await repo.findOne({ name: 'popuko' });
    // record は OkWoman | undefined の型を持つと解釈されている
    if (typeof record !== 'undefined') {
        console.log(record);
        // output: OkWoman { id: 1, name: 'popuko', age: 18, birthday: 2017-12-09T00:00:00.000Z, ok: false }
        // - birtday も ok も OkWoman で宣言した型になっている
        if (typeof record.ok !== 'boolean') {
            console.error('ok is not boolean');
            // 出力されない
        }
        if (!(record.birthday instanceof Date)) {
            console.error('birthday is not Date');
            // 出力されない
        }
        console.log(`Her birtday is ${record.birthday.toISOString()}`);
        // output: Her birtday is 2017-12-09T00:00:00.000Z
    }
}

main();
