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

  mesasDip: Mesas[][];
  occupationdefault: false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private mesasProvider: MesasProvider) {
  }

  ionViewDidEnter() {
    this.getAllMesas();
  }

  getAllMesas() {
    this.mesasProvider.getAll(this.occupationdefault)
      .then((result: Mesas[]) => {
        //Para transformar Objeto em Array pra não dar erro do NgFor
        this.mesasDip = result.map(function (obj) {
          return Object.keys(obj).map(function (chave) {
            return obj[chave];
          });
        });

      });

  }

  //Descrição da mesa selecionada
  public selected: string;
  //Id da mesa selecionada
  index: number;


  goToPage() {
    this.navCtrl.setRoot(HomePage);
  }

  itemSelected(item: any) {

    this.selected = (item.toString()).trim();

    let alert = this.alertCtrl.create({
      title: 'Ocupação de Mesa',
      subTitle: this.selected + ' Selecionada',
      buttons: ['OK']
    });
    alert.present();

    this.mesasProvider.get(this.selected)
      .then((result: Mesas) => {
        this.index = result.id;
      });

  }

  ocupar() {
    let escolhida = new Mesas();
    escolhida.id = this.index;
    escolhida.description = this.selected;
    escolhida.occupation = true;

    this.mesasProvider.update(escolhida)
      .then((result: Mesas) => {
        let alert = this.alertCtrl.create({
          title: 'Ocupação de Mesa',
          subTitle: this.selected + ' ocupada',
          buttons: ['OK']
        });
        alert.present();
      });


    this.goToPage();
  }
}
