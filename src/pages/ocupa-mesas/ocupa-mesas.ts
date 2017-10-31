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
  items: any[] = [];
  occupationdefault: false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private mesasProvider: MesasProvider) {
  }

  ionViewDidEnter() {
    this.getAllMesas();
  }

  getAllMesas() {
    this.mesasProvider.getAll(this.occupationdefault)
      .then((result: any[]) => {
        this.mesas = result;
      });
      this.extractingMesas(this.mesas);
  }

  extractingMesas(mesas:any){
    let i: number;
    for(i=0;i<mesas.lengh;i++){
      this.items[i] = mesas[i].getDescription();
    }
  }

  public selected: string;
  index: number;


  goToPage() {
    this.navCtrl.setRoot(HomePage);
  }

  itemSelected(item: string) {
    this.selected = item.trim();
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
