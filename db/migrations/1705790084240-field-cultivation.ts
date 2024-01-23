import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

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
          { name: 'growing_period_id', type: 'uuid', isNullable: false },
          { name: 'starting_date', type: 'date', isNullable: false },
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
      'field_cultivation',
      new TableForeignKey({
        columnNames: ['cultivation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cultivation',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'field_cultivation',
      new TableForeignKey({
        columnNames: ['machinery_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'machinery',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'field_cultivation',
      new TableForeignKey({
        columnNames: ['growing_period_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'growing_period',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Изтрийте външни ключове преди табличната структура
    await queryRunner.dropForeignKey('field_cultivation', 'cultivation_id');
    await queryRunner.dropForeignKey('field_cultivation', 'machinery_id');
    await queryRunner.dropForeignKey('field_cultivation', 'growing_period_id');

    await queryRunner.dropTable('field_cultivation', true, true, true);
  }
}