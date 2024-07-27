// message-admin.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'message-comp',
    template: `
        <div class="dv1">
            <p><strong>Nous sommes ravis de vous accueillir dans notre application</strong></p>
            <p><strong>dédiée à simplifier et améliorer l'expérience de gestion des stages académiques PFA et PFE.</strong></p>
            <p><strong>Et aussi faciliter la collaboration entre les encadrants pédagogiques et les étudiants candidats tout au long du processus de stage.</strong></p>
        </div>
    `,
    styles: `
    .dv1 {
      border: 2px solid #fff;
      padding: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      margin-left: 3cm;
      padding-right: 2cm;
      padding-left: 2cm;
      padding-top: 2cm;
      padding-bottom: 2cm;
      font-size: 18px;
      background: linear-gradient(to right, #8A2BE2, #4B0082); /* Violet */
      color:white;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }

    .margin-right {
      margin-right: 10px;
    }

    .button-container {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  `,
})
export class MessageAdminComponent {}
