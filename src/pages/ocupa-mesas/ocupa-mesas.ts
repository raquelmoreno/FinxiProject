import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

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

  public selected:string;

  items = [
    "Mesa 1",
    "Mesa 2",
    "Mesa 3",
    "Mesa 4"
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcupaMesasPage');
  }

  goToPage() {
    this.navCtrl.setRoot(HomePage);
 }

 itemSelected(item:string){
   this.selected = item.trim();
 }

 ocupar(){
   console.log(this.selected+ " ocupada");
   this.goToPage();
 }
}
