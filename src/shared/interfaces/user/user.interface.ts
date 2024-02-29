import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    lastName: string;
    @Column()
    male: boolean;
    @Column()
    email: string;
    @Column()
    password?: string;
}
