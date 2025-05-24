import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordFieldToEmployee1747887932806 implements MigrationInterface {
    name = 'AddPasswordFieldToEmployee1747887932806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying `);
        await queryRunner.query(`UPDATE "employee" set "password"='password' WHERE "password" IS NULL `);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password"SET NOT NULL `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
