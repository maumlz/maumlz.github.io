import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css', './navbar-halo.css'],
})
export class Navbar implements OnInit {
  currentLanguage: string = 'en';

  route: string;

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.route = this.router.url.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
  }

  ngOnInit() {
    // Set initial value
    this.route = this.router.url.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');

    // Track future movements
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event: NavigationEnd) => {
        this.route = event.urlAfterRedirects.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
      });
  }

  toggleLanguage(): void {
    const newLang = this.translate.getCurrentLang() === 'en' ? 'es' : 'en';
    this.translate.use(newLang);
    this.currentLanguage = newLang;
  }
}
