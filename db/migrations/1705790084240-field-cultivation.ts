import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFieldCultivationTable1705790084240
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'field_cultivation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'cultivation_id', type: 'uuid', isNullable: false },
          { name: 'machinery_id', type: 'uuid', isNullable: false },
          { name: 'growing_process_id', type: 'uuid', isNullable: false },
          { name: 'starting_date', type: 'date', isNullable: true },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('field_cultivation', true, true, true);
  }
}
