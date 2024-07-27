// notification.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'notification-comp',
  template: `
    <div class="notification-container">
      <table>
        <tbody>
          <tr *ngFor="let notification of notifications" class="notification-item">
            <td>
              <p class="timestamp">{{ notification.timestamp | date: 'shortTime' }}</p>
              <p>{{ notification.message }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .notification-container {
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 16px;
        margin-bottom: 20px;

      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      td {
        border-top: 1px solid #ddd; /* Add a border top for separation between rows */
        padding: 10px;
      }

      .timestamp {
        color: #888;
        font-size: 12px;
      }
    `,
  ],
})
export class NotificationComponent {
  notifications: any[] = [
    {
      message: 'New notification 1',
      timestamp: new Date(),
    },
    {
      message: 'New notification 2',
      timestamp: new Date(),
    },
    // Add more notifications as needed
  ];
}
