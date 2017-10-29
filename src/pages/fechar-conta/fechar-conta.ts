import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the FecharContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fechar-conta',
  templateUrl: 'fechar-conta.html',
})
export class FecharContaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FecharContaPage');
  }

  goToPage() {
    this.navCtrl.setRoot(HomePage);
 }

 submiting(mesa:string){
  let alert = this.alertCtrl.create({
    title: 'Fechamento de Conta',
    subTitle: "Conta fechada. Mesa "+ mesa + " desocupada",
    buttons: ['OK']
  });
  alert.present();
 }

}
