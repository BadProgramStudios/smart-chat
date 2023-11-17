import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild("contenido2") contenido2!: ElementRef;
  @ViewChild("contenido3") contenido3!: ElementRef;
  @ViewChild("contenido5") contenido5!: ElementRef;
  @ViewChild("contenido4") contenido4!: ElementRef;
  @ViewChild("contenido6") contenido6!: ElementRef;
  @ViewChild("contenido7") contenido7!: ElementRef;
  @ViewChild("contenido8") contenido8!: ElementRef;
  @ViewChild("cubo") cubo!: ElementRef;
  @ViewChild("texto") texto!: ElementRef;
  @ViewChild("logo") logo!: ElementRef;
  @ViewChild("fondo") fondo!: ElementRef;

  menu2:boolean = true;
  menu3:boolean = false;


  constructor(private router: Router, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Agrega una clase CSS para animar la aparición del chat
    setTimeout(() => {
      this.renderer.setStyle(this.logo.nativeElement, 'width','220px');
      this.renderer.setStyle(this.logo.nativeElement, 'top','10px');
    }, 2000);

    //this.renderer.addClass(this.chatBox.nativeElement, 'chat-slide-up');
    setTimeout(() => {
      this.renderer.setStyle(this.cubo.nativeElement, 'top','340px');
      this.renderer.setStyle(this.texto.nativeElement, 'left','0px');
    }, 3500);
  }

  abrirDetalleDatos() {
    this.router.navigate(['/myget']); // Navega a la página de detalles
  }

  atras(){
    console.log("atras click")
    this.renderer.setStyle(this.contenido2.nativeElement, 'opacity','0');
    this.renderer.setStyle(this.contenido3.nativeElement, 'opacity','0');
    this.renderer.setStyle(this.contenido5.nativeElement, 'opacity','0');

    this.renderer.setStyle(this.contenido4.nativeElement, 'opacity','0');
    this.renderer.setStyle(this.contenido8.nativeElement, 'opacity','0');

    this.renderer.setStyle(this.contenido6.nativeElement, 'opacity','0');
    this.menu3 = false; 
    
    setTimeout(() => {
      this.menu2 = true; 
    }, 1000);

   
    setTimeout(() => {
      this.renderer.setStyle(this.fondo.nativeElement, 'bottom','-700px');
      this.renderer.setStyle(this.contenido7.nativeElement, 'opacity','1'); 
    }, 1300);
    }

  siguiente(){
    console.log("atras click");
    this.renderer.setStyle(this.contenido2.nativeElement, 'opacity','1');
      this.renderer.setStyle(this.contenido3.nativeElement, 'opacity','1');
      this.renderer.setStyle(this.contenido5.nativeElement, 'opacity','1');
  
      this.renderer.setStyle(this.contenido4.nativeElement, 'opacity','1');
      setTimeout(()=>{
        this.renderer.setStyle(this.contenido8.nativeElement, 'opacity','1');
      },500)
  
      this.renderer.setStyle(this.contenido6.nativeElement, 'opacity','1');  
      this.renderer.setStyle(this.contenido7.nativeElement, 'opacity','0');  

    setTimeout(() => {
      this.menu3 = true; 
    }, 1000);

    this.renderer.setStyle(this.fondo.nativeElement, 'bottom','0px');
    this.menu2 = false;
    
   

  }
}
