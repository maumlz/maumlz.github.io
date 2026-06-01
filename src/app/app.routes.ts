import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then(m => m.About)
    },
    {
        path: 'resume',
        loadComponent: () => import('./pages/resume/resume').then(m => m.Resume)
    }
];
