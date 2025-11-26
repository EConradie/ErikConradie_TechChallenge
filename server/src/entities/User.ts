import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from "typeorm";
import { Todo } from "./Todo";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column({ unique: true })
  email!: string;

  @Column({select: false})
  password!: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Todo, todo => todo.user)
  todos!: Todo[];
}
