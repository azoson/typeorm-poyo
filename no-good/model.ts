import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
