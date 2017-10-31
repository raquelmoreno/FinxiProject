import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite'
import { FazerPedidoPageModule } from '../pages/fazer-pedido/fazer-pedido.module';
import { FecharContaPageModule } from '../pages/fechar-conta/fechar-conta.module';
import { OcupaMesasPageModule } from '../pages/ocupa-mesas/ocupa-mesas.module';
import { DatabaseProvider } from '../providers/database/database';
import { MesasProvider } from '../providers/mesas/mesas';
import { CardapioProvider } from '../providers/cardapio/cardapio';
import { PedidosProvider } from '../providers/pedidos/pedidos';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FazerPedidoPageModule,
    FecharContaPageModule,
    OcupaMesasPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    DatabaseProvider,
    MesasProvider,
    CardapioProvider,
    PedidosProvider
  ]
})
export class AppModule { }
