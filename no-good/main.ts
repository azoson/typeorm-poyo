import { createConnection } from "typeorm";
import { config } from "./typeorm.config";
import { OkWoman } from "./model";

type InsertableColumns =
    | 'name'
    | 'age'
    | 'birthday'
    | 'ok'
const noOkWomanToInsert: Pick<OkWoman, InsertableColumns> = {
    name: 'popuko',
    age: 18,
    birthday: new Date('2017/12/09'),
    ok: false,
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
        // output: OkWoman { id: 1, name: 'popuko', age: 18, birthday: '2017-12-09', ok: 0 }
        // - birthday は string、ok は number となっている。
        if (typeof record.ok !== 'boolean') {
            console.error('ok is not boolean');
            // 出力される（ ok の値が boolean でない）
        }
        if (!(record.birthday instanceof Date)) {
            console.error('birthday is not Date');
            // 出力される（ birthday の値が Date でない）
        }
        // if (record.ok === 0) { console.log('she is not an ok_woman'); }
        // - Compile error: Operator '===' cannot be applied to types 'boolean' and '0'.
        // if (record.birthday === '2017-12-09') { console.log(`Her birthday is ${record.birthday}`) }
        // - Compile error: Operator '===' cannot be applied to types 'Date' and 'string'.
        console.log(`Her birtday is ${record.birthday.toISOString()}`);
        // TypeError: record.birthday.toISOString is not a function
    }
}

main();
