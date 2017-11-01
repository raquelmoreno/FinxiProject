import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MesasProvider, Mesas } from '../../providers/mesas/mesas'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private mesasProvider: MesasProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FecharContaPage');
  }

  goToPage() {
    this.navCtrl.setRoot(HomePage);
  }

  submiting(mesa: string) {
    let nmesa = parseInt(mesa);

    let escolhida = new Mesas();
    escolhida.id = nmesa;
    escolhida.description = 'Mesa ' + nmesa;
    escolhida.occupation = false;

    this.mesasProvider.update(escolhida)
      .then((result: Mesas) => {
        let alert = this.alertCtrl.create({
          title: 'Fechamento de Conta',
          subTitle: "Conta fechada. Mesa " + nmesa + " desocupada",
          buttons: ['OK']
        });
        alert.present();
      });

      this.goToPage();
  }
}
