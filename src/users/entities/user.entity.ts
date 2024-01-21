import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    enum: ['admin', 'user'],
  })
  role: Role;
}
