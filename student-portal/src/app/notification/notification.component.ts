import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  message: string = '';
  type: 'success' | 'error' = 'success';

  showMessage(msg: string, msgType: 'success' | 'error') {
    this.message = msg;
    this.type = msgType;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
