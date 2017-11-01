import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { MesasProvider, Mesas } from '../../providers/mesas/mesas'

/**
 * Generated class for the OcupaMesasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocupa-mesas',
  templateUrl: 'ocupa-mesas.html',
})
export class OcupaMesasPage {

  mesas: Mesas[] = [];
  items: string[] = [];
  occupationdefault: false;
  conv: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private mesasProvider: MesasProvider) {
  }

  ionViewDidEnter() {
    this.getAllMesas();
  }

  getAllMesas() {
    this.mesasProvider.getAll(this.occupationdefault)
      .then((result: Mesas[]) => {
        //Para transformar Objeto em Array pra não dar erro do NgFor
        this.conv = result.map(function (obj) {
          return Object.keys(obj).map(function (chave) {
            return obj[chave];
          });
        });
        
        let alert = this.alertCtrl.create({
          title: 'Ocupação de Mesa',
          subTitle: this.conv + ' / ',
          buttons: ['OK']
        });
        alert.present();
        // this.mesas = result;
      });
    //this.extractingMesas(this.mesas);
  }

  extractingMesas(mesas: Mesas[]) {
    let i: number;
    for (i = 0; i < mesas.length; i++) {
      this.items[i] = mesas[i].getDescription();
    }
  }

  public selected: string;
  index: number;


  goToPage() {
    this.navCtrl.setRoot(HomePage);
  }

  itemSelected(item: any) {
    // this.selected = item.trim();
    let alert = this.alertCtrl.create({
      title: 'Ocupação de Mesa',
      subTitle: item + ' ',
      buttons: ['OK']
    });
    alert.present();

    // this.index = this.mesas.indexOf(this.selected);
  }

  ocupar() {
    this.mesas.splice(this.index, 1);

    let alert = this.alertCtrl.create({
      title: 'Ocupação de Mesa',
      subTitle: this.selected + ' ocupada',
      buttons: ['OK']
    });
    alert.present();
    this.goToPage();
  }
}
