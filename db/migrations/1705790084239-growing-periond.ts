import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateGrowingPeriodTable1705790084239
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'growing_period',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'crop_id', type: 'uuid', isNullable: false },
          { name: 'field_id', type: 'uuid', isNullable: false },
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

    // Добавете външни ключове
    await queryRunner.createForeignKey(
      'growing_period',
      new TableForeignKey({
        columnNames: ['crop_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'crop',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'growing_period',
      new TableForeignKey({
        columnNames: ['field_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'field',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Изтрийте външни ключове преди табличната структура
    await queryRunner.dropForeignKey('growing_period', 'crop_id');
    await queryRunner.dropForeignKey('growing_period', 'field_id');

    await queryRunner.dropTable('growing_period', true, true, true);
  }
}
