import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { effects, reducers } from './store/index';
import { UserReducer } from './store/user';
import { AuthInterceptor } from './shared/auth.interceptor';
import { UsersReducer } from './store/users';
import { ProductsReducer } from './store/products';
import { EditorModule } from '@tinymce/tinymce-angular';
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
        SharedModule,
        // StoreModule.forRoot({ user: UserReducer, users: UsersReducer }, {
        //     runtimeChecks: {
        //         strictStateImmutability: true,
        //         strictActionImmutability: true
        //     }
        // }),
        StoreModule.forFeature('user', UserReducer),
        StoreModule.forFeature('users', UsersReducer),
        StoreModule.forFeature('products', ProductsReducer),
        EffectsModule.forRoot(effects),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        StoreModule.forRoot({}, {}),
        EditorModule
    ],
    providers: [

        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
