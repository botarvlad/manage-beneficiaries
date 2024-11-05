import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManageBeneficiariesComponent } from './components/manage-beneficiaries/manage-beneficiaries.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ManageBeneficiariesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Manage Beneficiaries';
}
