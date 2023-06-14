import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  richDescription='';
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      richDescription: [''],
      image: [''],
      images: [[]],
      brand: [''],
      countInStock: ['',[Validators.required]],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      // Process the form data
      console.log(this.productForm.value);
    } else {
      // Form is invalid
      // Display error messages or handle accordingly
    }
  }
  ngAfterViewInit(){
    this.productForm.get('richDescription').valueChanges.subscribe(data=>{
      console.log(data)
    })
  }

}
