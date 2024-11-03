import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BeneficiariesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Manage Beneficiaries';
}
