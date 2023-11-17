import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myget',
  templateUrl: './myget.page.html',
  styleUrls: ['./myget.page.scss'],
})
export class MygetPage implements OnInit {

  datos: any; // Variable para almacenar los datos

  constructor(private apiService: ApiService, private navCtrl: NavController) {}

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.apiService.getDatos().subscribe(
      (data) => {
        // Almacena los datos recibidos en la variable 'datos'
        this.datos = data;
        console.log(this.datos);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  volverAHome() {
    this.navCtrl.navigateBack('/home'); // Reemplaza '/home' con la ruta de tu página anterior
  }
}
