import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-modal',

  templateUrl: './list-modal.component.html',
  styleUrl: './list-modal.component.css'
})
export class ListModalComponent {
  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate(['/admin', route]);
  }



}
