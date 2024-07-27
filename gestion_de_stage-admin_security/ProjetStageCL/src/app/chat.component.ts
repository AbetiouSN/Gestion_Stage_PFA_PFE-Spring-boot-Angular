import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  template: `
  <div class="chat">
  <div class="chat-history">
    <table>
      <tr *ngFor="let message of messages; let i = index" class="message">
        <td class="message-data">
          <img src="data:image/jpeg;base64,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" alt="">
          <br> <!-- Utilisation de <br> pour passer à la ligne -->
          <span class="message-data-time">{{ message.sender }}</span>
        </td>
        <td class="message-text">{{ message.text }}</td>
      </tr>
    </table>
  </div>
  <input type="text" [(ngModel)]="newMessage" (keyup.enter)="sendMessage()" class="form-control" placeholder="Type your message...">
</div>


  `,
  styles: `
    .chat {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f7f7f7;
}

.message {
  display: flex;
  margin-bottom: 15px;
}

.message-data img {
  border-radius: 40px;
  width: 40px;
}

.message-data-time {
  color: #434651;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

.form-control:focus {
  border-color: #66afe9;
}
  `,
})
export class ChatComponent {
  messages: { sender: string; text: string }[] = [
    // ...
  ];

  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ sender: 'moi', text: this.newMessage });
      this.newMessage = '';

      // Simulez une réponse après une courte pause
      setTimeout(() => {
        this.messages.push({ sender: 'encadrant', text: 'Réponse de l\'utilisateur 2.' });
      }, 500);
    }
  }
}