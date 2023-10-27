// import { MigrationInterface, QueryRunner } from "typeorm";

// export class MyMigration1691480710546 implements MigrationInterface {
//     name = 'MyMigration1691480710546'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE "threads" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "image" character varying NOT NULL, "posted_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`DROP TABLE "threads"`);
//     }

// }
