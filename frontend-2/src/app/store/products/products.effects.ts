import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, } from 'rxjs/operators';
import * as fromActions from './products.actions';
import { Injectable } from '@angular/core';
import { NotificationService } from '@app/notification/notification.service';
import { Router } from '@angular/router';
import { ProductsService } from '@app/products/services/products.service';
import { IProduct } from '@app/shared/models/Backend/Product';


type Action = fromActions.All;

@Injectable()
export class ProductsEffects {
    constructor(private actions: Actions,
        private productsService: ProductsService,
        private notificcation: NotificationService,
        private router: Router
    ) { }

    @Effect()
    getAllUser:Observable<Action> = this.actions.pipe(
        ofType(fromActions.Types.GET_ALL_PRODUCTS),
       switchMap((action:fromActions.GetAllProducts)=>this.productsService.getAllProducts().pipe(
        map((response:any)=>{
           return new fromActions.GetAllProductsSuccess(response.data.products);
        }),
        catchError((err)=>{
            this.notificcation.error('Falid to load products');
            return of(new fromActions.GetAllProductsError());
        })
       )),

    )
    
}