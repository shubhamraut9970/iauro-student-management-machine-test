import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentAppComponent } from './student-app/student-app.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentAppComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularTask';
}
