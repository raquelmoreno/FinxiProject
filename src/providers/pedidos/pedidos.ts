import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the PedidosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidosProvider {

  constructor(private dbProvider: DatabaseProvider, public alertCtrl: AlertController) { }

  public insert(nmesa: number, item: number, qtde: number) {
    var sucess = false;

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        db.sqlBatch([
          ['insert into pedidos (mesa,item,qtde) values (?,?,?)', [nmesa, item, qtde]]
        ])
          .then(() => {
            console.log('Pedido incluído')
            let alert = this.alertCtrl.create({
              title: 'Inclusao de Pedido',
              subTitle: 'Pedido incluido',
              buttons: ['OK']
            });
            alert.present();

          })
          .catch(e =>{ console.error('Erro ao incluir pedido', e)
          let alert = this.alertCtrl.create({
            title: 'Inclusao de Pedido',
            subTitle: 'Falha ao incluir pedido',
            buttons: ['OK']
          });
          alert.present();
        });

      })
      .catch((e) => console.error(e));
  }


}


export class Pedido {
  id: number;
  mesa: number;
  item: number;

}
