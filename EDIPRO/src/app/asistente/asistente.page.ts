import { Message } from './../models/message.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { IonContent } from '@ionic/angular';
import { CustomValidators } from '../utils/custom-validators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asistente',
  templateUrl: './asistente.page.html',
  styleUrls: ['./asistente.page.scss'],
})
export class AsistentePage implements OnInit {

  @ViewChild(IonContent, {static: false}) content!: IonContent;

  messages: Message[] = [];

  form = new FormGroup({
    promt: new FormControl('', [Validators.required, CustomValidators.noWhiteSpace])
  })

  loading:boolean = false;

  constructor(private openAI: ApiService, private alertController: AlertController) { }

  ngOnInit() {
  }

  extraerYLimpiarJSON(mensajeOriginal: any): any {
    // Expresión regular para identificar y extraer el formato JSON{...}
    const regex = /JSON\{(.*?)\}/;
    
    // Buscamos la coincidencia en el mensaje del bot
    const resultado = mensajeOriginal.bot.match(regex);

    if (resultado) {
        // Corregimos las comillas tipográficas a comillas estándar
        const jsonCorregido = resultado[1].replace(/[“”]/g, '"');
        
        try {
            // Intentamos convertir la cadena corregida a un objeto JSON
            const jsonExtraido = JSON.parse(`{${jsonCorregido}}`);
            
            // Eliminamos la parte extraída del mensaje original
            mensajeOriginal.bot = mensajeOriginal.bot.replace(regex, '');
            
            // Retornamos el JSON extraído y el mensaje limpio
            return { jsonExtraido, mensajeOriginal };
        } catch (error) {
            // Manejo de errores de parseo
            console.error('Error al parsear JSON:', error);
            return { jsonExtraido: null, mensajeOriginal };
        }
    } else {
        // Si no se encuentra el formato, retornamos el mensaje original sin cambios
        return { jsonExtraido: null, mensajeOriginal };
    }
}
  submit(){
    if(this.form.valid){


    let promt = this.form.value.promt as string;

    //Mensaje usuario
    let userMsg: Message = { sender: 'me', content: promt }
    this.messages.push(userMsg);
    this.scrollToButton();
    //Mensaje bot
    let botMsg: Message = { sender: 'bot', content: '' }
    this.messages.push(botMsg);

    this.loading = true;
    this.form.reset();
    this.form.disable();

    // Convertir el array de objetos JSON en un texto coherente para el prompt
    const fullPrompt = this.messages.map(item => {
      // Asumimos que 'me' representa al usuario y 'bot' al modelo.
      return item.sender === 'me' ? `Usuario: ${item.content}` : item.content;
    }).join('\n');

    // Aquí agregarías el nuevo mensaje del usuario
    const newUserMessage = promt;
    const promptToSend = `${fullPrompt}\nUsuario: ${newUserMessage}`;

    this.openAI.sedQuestion(promptToSend).subscribe({
      next: (res: any) => {
        console.log(res);
        let result = this.extraerYLimpiarJSON(res);
        console.log("completo actualizado");
        console.log(result.jsonCorregido);
        console.log("json que salio");
        console.log(result.jsonExtraido);
        try {
          if(result.jsonExtraido.tipo == "calendario"){
            this.presentAlertCalendario(result.jsonExtraido.mensaje);
          }else if(result.jsonExtraido.tipo == "mapa"){
            this.presentAlertWaze(result.jsonExtraido.mensaje);
          }else if(result.jsonExtraido.tipo == "llamada"){
            this.presentAlertLlamada(result.jsonExtraido.mensaje);
          }
        } catch (error) {
          
        }
        

        this.typeText(res.bot);
        this.loading = false;
        this.form.enable();
        console.log(this.messages);
        
        
      }, error: (error: any) => {
        console.log(error)
      }
    })
  }
  
}

  typeText(text:string){
    let textIndex = 0;
    let messageLastIndex = this.messages.length - 1;

    let interval = setInterval(()=>{
      
      if(textIndex < text.length){
        this.messages[messageLastIndex].content += text.charAt(textIndex);
        textIndex++;
      }else{
        clearInterval(interval);     
        this.scrollToButton();
      }
    }, 15);
  }

  
  extractAndAlertJson(inputString: string): void {
    // Busca el índice donde comienza "JSON{"
    const startIndex = inputString.indexOf("JSON{");
    if (startIndex === -1) {
        console.log("No se encontró JSON en el string.");
        return;
    }

    // Extrae el string desde el inicio de "JSON{" hasta el final del string
    let jsonString = inputString.substring(startIndex + 4);
    
    // Intenta parsear el JSON
    try {
        let json = JSON.parse(jsonString);

        // Muestra un alert con el contenido del JSON
        alert(`Alerta: ${json.alerta}\nMensaje: ${json.mensaje}`);
    } catch (e) {
        console.error("Error al parsear JSON:", e);
    }
}

async presentAlertLlamada(text:string) {
  const alert = await this.alertController.create({
    header: 'Alerta',
    message: text,
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Llamar',
        handler: () => {
          console.log('Alert confirmed');
          window.open('tel:+56965145262', '_system');
        },
      },
    ]
  });

  await alert.present();
}

async presentAlertCalendario(text:string) {
  const alert = await this.alertController.create({
    header: 'Alerta',
    message: text,
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Agregar al calendario',
        handler: () => {
          console.log('Alert confirmed');
          this.generarICS();
        },
      },
    ]
  });

  await alert.present();
}

generarICS() {
  const event = {
    start: '20231115T160000',  // Próximo miércoles a las 4:00 PM
    end: '20231115T170000',    // Estableciendo una hora de finalización (5:00 PM)
    summary: 'Cita Importante EDIPRO',
    description: 'Nuevo cliente',
    location: 'Oficinas EdiPro'
  };

  const icsContent = 
    `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.summary}\nLOCATION:${event.location}\nDESCRIPTION:${event.description}\nDTSTART:${event.start}\nDTEND:${event.end}\nEND:VEVENT\nEND:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'evento.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async presentAlertWaze(text:string) {
  const alert = await this.alertController.create({
    header: 'Alerta',
    message: text,
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Ir con waze',
        handler: () => {
          console.log('Alert confirmed');
          const latitude = -33.42900845630232;
          const longitude = -70.6213264183351;
          const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
          window.open(url, '_blank');        },
      },
    ]
  });

  await alert.present();
}

  scrollToButton(){
    this.content.scrollToBottom(2000);
  }

}
