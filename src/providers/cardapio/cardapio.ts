import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the CardapioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardapioProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public get(description: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from cardapio where description = ?';
        let data = [description];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let cardapio = new Cardapio();
              cardapio.id = item.id;
              cardapio.description = item.description;


              return cardapio;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        return db.executeSql('SELECT id,description FROM cardapio', [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let items: Cardapio[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var cardapio = data.rows.item(i);
                items.push(cardapio);
              }
              return items;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e))
      })
      .catch((e) => console.error(e));
  }

}


export class Cardapio {
  id: number;
  description: string;

}
