import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1705309821791 implements MigrationInterface {
    name = 'Table1705309821791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "rights" "public"."user_rights_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "soil" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "soil" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_bc7efbd307095fd17ebeec730de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cultivation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cultivation" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_4cc4355a3e4865a33d580692b71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" point NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3bf246b27a3b6678dfc0b7a3f64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "machinery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "model" character varying NOT NULL, "identification_number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "farm_id" uuid, CONSTRAINT "PK_96bd84e67379eb9e594494dff40" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crop" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f306910b05e2d54ed972a536a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "field" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "boundaries" polygon NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "soil_id" uuid, "farm_id" uuid, CONSTRAINT "PK_39379bba786d7a75226b358f81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "growing_period" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "crop_id" uuid, "field_id" uuid, CONSTRAINT "PK_d2233e049d26c9fab82e840cc08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "field_cultivation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "starting_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "cultivation_id" uuid, "machinery_id" uuid, "growing_process_id" uuid, CONSTRAINT "PK_ed9641bf27693edcdbacadbbffb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "machinery" ADD CONSTRAINT "FK_ac2b15ff23355bbf153f6b5d5a5" FOREIGN KEY ("farm_id") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field" ADD CONSTRAINT "FK_b0b5c163d6cebfcddb7e79a975b" FOREIGN KEY ("soil_id") REFERENCES "soil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field" ADD CONSTRAINT "FK_725288d262a578ffe1d8d1c77d4" FOREIGN KEY ("farm_id") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "growing_period" ADD CONSTRAINT "FK_2f77d8caea966b4830d90473eee" FOREIGN KEY ("crop_id") REFERENCES "crop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "growing_period" ADD CONSTRAINT "FK_460299a980efb9105670ab6bafd" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field_cultivation" ADD CONSTRAINT "FK_96659ae438638c1a55afc1490da" FOREIGN KEY ("cultivation_id") REFERENCES "cultivation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field_cultivation" ADD CONSTRAINT "FK_e01381a86e7d5cdac032a99039c" FOREIGN KEY ("machinery_id") REFERENCES "machinery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field_cultivation" ADD CONSTRAINT "FK_a39af6f7e578bf40abfa5196eaa" FOREIGN KEY ("growing_process_id") REFERENCES "growing_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "field_cultivation" DROP CONSTRAINT "FK_a39af6f7e578bf40abfa5196eaa"`);
        await queryRunner.query(`ALTER TABLE "field_cultivation" DROP CONSTRAINT "FK_e01381a86e7d5cdac032a99039c"`);
        await queryRunner.query(`ALTER TABLE "field_cultivation" DROP CONSTRAINT "FK_96659ae438638c1a55afc1490da"`);
        await queryRunner.query(`ALTER TABLE "growing_period" DROP CONSTRAINT "FK_460299a980efb9105670ab6bafd"`);
        await queryRunner.query(`ALTER TABLE "growing_period" DROP CONSTRAINT "FK_2f77d8caea966b4830d90473eee"`);
        await queryRunner.query(`ALTER TABLE "field" DROP CONSTRAINT "FK_725288d262a578ffe1d8d1c77d4"`);
        await queryRunner.query(`ALTER TABLE "field" DROP CONSTRAINT "FK_b0b5c163d6cebfcddb7e79a975b"`);
        await queryRunner.query(`ALTER TABLE "machinery" DROP CONSTRAINT "FK_ac2b15ff23355bbf153f6b5d5a5"`);
        await queryRunner.query(`DROP TABLE "field_cultivation"`);
        await queryRunner.query(`DROP TABLE "growing_period"`);
        await queryRunner.query(`DROP TABLE "field"`);
        await queryRunner.query(`DROP TABLE "crop"`);
        await queryRunner.query(`DROP TABLE "machinery"`);
        await queryRunner.query(`DROP TABLE "farm"`);
        await queryRunner.query(`DROP TABLE "cultivation"`);
        await queryRunner.query(`DROP TABLE "soil"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
