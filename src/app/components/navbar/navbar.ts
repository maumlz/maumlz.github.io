import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css', './navbar-halo.css'],
})
export class Navbar {

  currentLanguage: string = 'en';

  route: string;

  private router = inject(Router);

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.route = this.router.url;
  }

  ngOnInit() {
    // Set initial value
    this.route = this.router.url;

    // Track future movements
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.route = event.url.substring(1); // Or use this.location.path(true) here
    });
  }

  toggleLanguage(): void {
    const newLang = this.translate.getCurrentLang() === 'en' ? 'es' : 'en';
    this.translate.use(newLang);
    this.currentLanguage = newLang;
  }
}
