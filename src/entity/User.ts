import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
    id!: string;

  @Column({ name: 'name', type: 'text' })
    name!: string;
}
