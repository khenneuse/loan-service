import {
  Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from './transformer/ColumnNumericTransformer';

@Entity('loan_applications')
export class LoanApplication {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
    id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
    userId!: string;

  @Column({ name: 'credit_score', type: 'integer' })
    creditScore!: number;

  @Column({
    name: 'monthly_debt',
    type: 'numeric',
    precision: 9,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
    monthlyDebt!: number;

  @Column({
    name: 'monthly_income',
    type: 'numeric',
    precision: 9,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
    monthlyIncome!: number;

  @Column({ name: 'bankruptcies', type: 'integer' })
    bankruptcies!: number;

  @Column({ name: 'delinquencies', type: 'integer' })
    delinquencies!: number;

  @Column({
    name: 'vehicle_value',
    type: 'numeric',
    precision: 9,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
    vehicleValue!: number;

  @Column({
    name: 'loan_amount',
    type: 'numeric',
    precision: 9,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
    loanAmount!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
