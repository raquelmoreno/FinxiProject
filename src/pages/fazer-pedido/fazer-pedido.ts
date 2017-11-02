import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CardapioProvider, Cardapio } from '../../providers/cardapio/cardapio'
import { PedidosProvider, Pedido } from '../../providers/pedidos/pedidos'

/**
 * Generated class for the FazerPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fazer-pedido',
  templateUrl: 'fazer-pedido.html',
})
export class FazerPedidoPage {

  public mesa: number;
   //Descrição da item selecionado
  public pedido: string;

  //Id do item selecionado
  index: number;

  items: Cardapio[][];



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private CardapioProvider: CardapioProvider, private PedidosProvider: PedidosProvider) {
  }

  ionViewDidLoad() {
    this.getAllItens();
  }

  goToPage() {
    this.navCtrl.setRoot(HomePage);
  }

  getAllItens() {
    this.CardapioProvider.getAll()
      .then((result: Cardapio[]) => {
        //Para transformar Objeto em Array pra não dar erro do NgFor
        this.items = result.map(function (obj) {
          return Object.keys(obj).map(function (chave) {
            return obj[chave];
          });
        });

      });

  }

  itemSelected(item: any) {

    this.pedido = (item.toString()).trim();


    this.CardapioProvider.get(this.pedido)
      .then((result: Cardapio) => {
        this.index = result.id;
      });



  }



  submiting(mesa: number, qtde: number) {

    this.PedidosProvider.insert(mesa,this.index,qtde);
    this.mesa = mesa;

    let alert = this.alertCtrl.create({
      title: 'Confirmação',
      subTitle: 'Pedido Feito! ' + 'Mesa: ' + this.mesa + ' Pedido: ' + this.pedido + ' Qtde: ' + qtde,
      buttons: ['OK']
    });
    alert.present();
  }


}
