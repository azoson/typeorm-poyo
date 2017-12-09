import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from "typeorm";

@Entity('ok_women')
export class OkWoman {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('int', { name: 'age' })
    age: number;

    @Column('date', { name: 'birthday' })
    birthday: Date;

    @Column('tinyint', { name: 'ok' })
    ok: boolean;

    @AfterLoad()
    converter() {
        this.birthday = new Date(this.birthday);
        this.ok = (<any>this.ok === 0) ? false : true;
    }
}
