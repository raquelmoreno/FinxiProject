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
    if (mesa == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Fechamento de Conta',
        subTitle: "Insira o numero da mesa a ser desocupada",
        buttons: ['OK']
      });
      alert.present();
    } else {
      var aux = "Mesa " + nmesa;
      this.mesasProvider.get(aux)
        .then((result: Mesas) => {
          if (result.occupation == false) {
            let alert2 = this.alertCtrl.create({
              title: 'Fechamento de Conta',
              subTitle: "Esta mesa não está ocupada",
              buttons: ['OK']
            });
            alert2.present();
          } else {
            result.occupation = false;

            this.mesasProvider.update(result)
              .then((result: Mesas) => {
                let alert3 = this.alertCtrl.create({
                  title: 'Fechamento de Conta',
                  subTitle: "Conta fechada. Mesa " + nmesa + " desocupada",
                  buttons: ['OK']
                });
                alert3.present();
              });

          }
        });
    }

    this.goToPage();
  }
}
