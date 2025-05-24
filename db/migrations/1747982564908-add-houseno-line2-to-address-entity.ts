import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHousenoLine2ToAddressEntity1747982564908 implements MigrationInterface {
    name = 'AddHousenoLine2ToAddressEntity1747982564908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying NOT NULL DEFAULT 'house 1'`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying NOT NULL DEFAULT 'kerala'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT '2025-05-23 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET DEFAULT 'EMP1'`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
    }

}
