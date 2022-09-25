import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
    id!: string;

  @Column({ name: 'name', type: 'text' })
    name!: string;
}
