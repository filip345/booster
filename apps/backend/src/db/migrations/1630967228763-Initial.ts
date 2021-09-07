import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1630967228763 implements MigrationInterface {
    name = 'Initial1630967228763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle_type" ("id" SERIAL NOT NULL, "make" citext NOT NULL, "model" citext NOT NULL, "year" integer NOT NULL, CONSTRAINT "UQ_309d6004b25a56df12e52f693bd" UNIQUE ("make", "model", "year"), CONSTRAINT "PK_465137c10960b54f82f1b145e43" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicle_type"`);
    }

}
