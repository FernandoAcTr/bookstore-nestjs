import { MigrationInterface, QueryRunner } from 'typeorm'

export class secondMigration1618445826308 implements MigrationInterface {
  name = 'secondMigration1618445826308'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_details_status_enum" AS ENUM('ACTIVE', 'DISABLED')`,
    )
    await queryRunner.query(
      `CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "lastname" character varying, "status" "user_details_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "descripcion" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("userId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_b01ef935279d458c586ffd75ec1" PRIMARY KEY ("userId", "rolesId"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id_details" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_b50acb6424bce0cdc783a022ce1" UNIQUE ("id_details")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_b50acb6424bce0cdc783a022ce1" FOREIGN KEY ("id_details") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_b50acb6424bce0cdc783a022ce1"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_b50acb6424bce0cdc783a022ce1"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id_details"`)
    await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`)
    await queryRunner.query(`DROP INDEX "IDX_472b25323af01488f1f66a06b6"`)
    await queryRunner.query(`DROP TABLE "user_roles"`)
    await queryRunner.query(`DROP TABLE "roles"`)
    await queryRunner.query(`DROP TABLE "user_details"`)
    await queryRunner.query(`DROP TYPE "user_details_status_enum"`)
  }
}
