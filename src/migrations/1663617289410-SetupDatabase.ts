import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupDatabase1663617289410 implements MigrationInterface {
  name = 'SetupDatabase1663617289410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY NOT NULL,
        name text NOT NULL
      )
   `);
    await queryRunner.query(`
      CREATE TABLE loan_applications (
        id uuid PRIMARY KEY NOT NULL,
        user_id uuid NOT NULL,
        credit_score integer NOT NULL,
        monthly_debt numeric(9, 2) NOT NULL,
        monthly_income numeric(9, 2) NOT NULL,
        bankruptcies integer NOT NULL,
        vehicle_value numeric(9, 2) NOT NULL,
        loan_amount numeric(9, 2) NOT NULL,
        delinquencies integer NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        deleted_at TIMESTAMP WITH TIME ZONE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS loan_application');
    await queryRunner.query('DROP TABLE IF EXISTS user');
  }
}
