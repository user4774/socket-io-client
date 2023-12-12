import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayerInfoComponent } from './player-info/player-info.component';

export const routes: Route[] = [
    {path: '', component: AppComponent},
    {path: 'a', component: PlayerInfoComponent}
];
