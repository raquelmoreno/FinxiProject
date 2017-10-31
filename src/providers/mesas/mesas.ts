import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class MesasProvider {

  constructor(private dbProvider: DatabaseProvider) { }


  public update(mesa: Mesas) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update mesas set occupation = ? where id = ?';
        let data = [ mesa.id, mesa.occupation ? 1 : 0];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(description: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from products where description = ?';
        let data = [description];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let mesa = new Mesas();
              mesa.id = item.id;
              mesa.description = item.description;
              mesa.occupation = item.occupation;


              return mesa;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(occupation: boolean) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT id,description FROM mesas where occupation = ?';
        var data: any[] = [occupation ? 1 : 0];


        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let mesas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var mesa = data.rows.item(i);
                mesas.push(mesa);
              }
              return mesas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Mesas {
  id: number;
  description: string;
  occupation: boolean;

  getDescription(){
    return this.description;
  }
}
