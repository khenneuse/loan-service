import {
  Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { DecimalTransformer } from './transformer/decimal';

@Entity('loan_applications')
export class LoanApplication {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
    id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
    userId!: string;

  @Column({ name: 'credit_score', type: 'integer' })
    creditScore!: number;

  @Column({
    name: 'monthly_debt', type: 'numeric', precision: 9, scale: 2, transformer: new DecimalTransformer(),
  })
    monthlyDebt!: number;

  @Column({
    name: 'monthly_income', type: 'numeric', precision: 9, scale: 2, transformer: new DecimalTransformer(),
  })
    monthlyIncome!: number;

  @Column({ name: 'bankruptcies', type: 'integer' })
    bankruptcies!: number;

  @Column({
    name: 'vehicle_value', type: 'numeric', precision: 9, scale: 2, transformer: new DecimalTransformer(),
  })
    vehicleValue!: number;

  @Column({
    name: 'loan_amount', type: 'numeric', precision: 9, scale: 2, transformer: new DecimalTransformer(),
  })
    loanAmount!: number;

  @Column({ name: 'delinquencies', type: 'integer' })
    delinquencies!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

  // This column is manually managed at the application level,
  // unlike created_at and updated_at. typeorm doesn't support soft deletes :'(
  // https://github.com/typeorm/typeorm/issues/534
  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
