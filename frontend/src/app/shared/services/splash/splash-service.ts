import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SplashScreenService {
    private renderer: Renderer2;
    constructor(
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        // Hide it on the first NavigationEnd event
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                let splash = this.renderer.selectRootElement('#splashScreen');
                if (splash.style.display != 'none') splash.style.display = 'none';
            });
    }


}
