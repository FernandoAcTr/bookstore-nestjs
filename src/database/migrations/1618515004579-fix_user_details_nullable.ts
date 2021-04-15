import { MigrationInterface, QueryRunner } from 'typeorm'

export class fixUserDetailsNullable1618515004579 implements MigrationInterface {
  name = 'fixUserDetailsNullable1618515004579'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_details" ALTER COLUMN "name" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_details" ALTER COLUMN "name" SET NOT NULL`,
    )
  }
}
