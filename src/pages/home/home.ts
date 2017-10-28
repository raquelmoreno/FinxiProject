import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FazerPedidoPage } from '../fazer-pedido/fazer-pedido';
import { FecharContaPage } from '../fechar-conta/fechar-conta';
import { OcupaMesasPage } from '../ocupa-mesas/ocupa-mesas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToPage(root:string) {
    this.navCtrl.setRoot(root);
 }

}
