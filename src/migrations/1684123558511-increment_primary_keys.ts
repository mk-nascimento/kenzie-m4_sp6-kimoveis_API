import { MigrationInterface, QueryRunner } from "typeorm";

export class IncrementPrimaryKeys1684123558511 implements MigrationInterface {
    name = 'IncrementPrimaryKeys1684123558511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" DROP DEFAULT`);
    }

}
