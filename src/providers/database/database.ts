import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /**
  * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
  */
  public getDB() {
    return this.sqlite.create({
      name: 'restaurante.db',
      location: 'default'
    });
  }

  /**
  * Cria a estrutura inicial do banco de dados
  */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        this.insertDefaultItems(db);

        // this.dropTables(db);
      })
      .catch(e => console.log(e));
  }

  private dropTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['DROP TABLE mesas'],
      ['DROP TABLE cardapio'],
      ['DROP TABLE pedidos'],
    ])
      .then(() => console.log('Tabelas deletadas'))
      .catch(e => console.error('Erro ao deletar as tabelas', e));
  }

  /**
  * Criando as tabelas no banco de dados
  * @param db
  */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS mesas (id integer primary key AUTOINCREMENT NOT NULL, description TEXT, occupation integer)'],
      ['CREATE TABLE IF NOT EXISTS cardapio (id integer primary key AUTOINCREMENT NOT NULL, description TEXT)'],
      ['CREATE TABLE IF NOT EXISTS pedidos (id integer primary key AUTOINCREMENT NOT NULL, mesa integer not null, item integer not null, qtde integer not null, foreign key (mesa) references mesas(id),foreign key (item) references cardapio(id))'],
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from mesas', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into mesas (description,occupation) values (?,?)', [['Mesa 1'], 0]],
            ['insert into mesas (description,occupation) values (?,?)', [['Mesa 2'], 0]],
            ['insert into mesas (description,occupation) values (?,?)', [['Mesa 3'], 0]],
            ['insert into mesas (description,occupation) values (?,?)', [['Mesa 4'], 0]]
          ])
            .then(() => console.log('Dados padrões da mesa incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões das mesas', e));

        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de mesas', e));


    db.executeSql('select COUNT(id) as qtd from cardapio', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into cardapio (description) values (?)', ['Coca-Cola']],
            ['insert into cardapio (description) values (?)', ['Cerveja']],
            ['insert into cardapio (description) values (?)', ['Couvert']],
            ['insert into cardapio (description) values (?)', ['Tabua de Frios']]
          ])
            .then(() => console.log('Dados padrões do cardapio incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões do cardapio', e));

        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de itens do cardapio', e));
  }
}
