import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('maumlz.github.io');

  currentLanguage: string = 'en';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  toggleLanguage(): void {
    const newLang = this.translate.getCurrentLang() === 'en' ? 'es' : 'en';
    this.translate.use(newLang);
    this.currentLanguage = newLang;
  }
}
