import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as fromUser from './store/user';
import * as fromRoot from './store';
import { Store } from '@ngrx/store';
import { SplashScreenService } from './shared/services/splash/splash-service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private splashScreenService: SplashScreenService, private translate: TranslateService, private store: Store<fromRoot.AppState>) {
        translate.setDefaultLang('en');
    }

    ngOnInit() {
        this.store.dispatch(new fromUser.Init())
    }
}
