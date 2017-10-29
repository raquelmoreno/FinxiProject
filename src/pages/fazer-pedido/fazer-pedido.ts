import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

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

 public mesa:number;
 public pedido:string;

  items=[
    "Coca-Cola",
    "Cerveja",
    "Couvert",
    "Tabua de Frios"
  ];

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FazerPedidoPage');
  }

  goToPage() {
    this.navCtrl.setRoot(HomePage);
  }

  

  submiting(mesa:number,pedido:string) {
   
    this.mesa = mesa;
    this.pedido = pedido.trim();
    console.log('Mesa: '+ this.mesa + ' Pedido: ' + this.pedido);
    let alert = this.alertCtrl.create({
      title: 'Confirmação',
      subTitle: "Pedido Feito",
      buttons: ['OK']
    });
    alert.present();
  }
 

}
