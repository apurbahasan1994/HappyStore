import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from '@app/store';
import { IUserBase, getLoading } from '@app/store/user';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromProducts from '../../../store/products'
import { IProduct } from '@app/shared/models/Backend/Product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  isLoading$: Observable<boolean>;
  products$: Observable<IProduct[]>;
  displayedColumns: string[] = ['name', 'price', 'actions','brand','countInStock', 'rating', 'featured'];
  dataSource: MatTableDataSource<IProduct>;
  products: IProduct[] = [
  ];
  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(getLoading));
    this.store.dispatch(new fromProducts.GetAllProducts());
    this.getUsers();
  }
  getUsers() {
    this.products$ = this.store.pipe(select(fromProducts.getProducts));
    this.products$.subscribe(data => {
      console.log(this.products);
      this.dataSource =new MatTableDataSource<IProduct>(data);
    })
  }
  editUser(user: IUserBase) {
    // Handle edit functionality
    console.log('Edit user:', user);
  }

  deleteUser(user: IUserBase) {
    // Handle delete functionality
    console.log('Delete user:', user);
  }

}
