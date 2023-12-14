import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,NgFor, RouterOutlet, HeaderComponent,FooterComponent],
  providers: [CookieService],
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'frontend';
}
