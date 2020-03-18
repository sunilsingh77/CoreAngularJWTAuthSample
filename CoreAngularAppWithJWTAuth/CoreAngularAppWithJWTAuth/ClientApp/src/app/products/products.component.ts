import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: IProduct[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<IProduct[]>(baseUrl + 'api/products/GetProducts').subscribe(result => {
      this.products = result;
      console.log(result);
    }, error => console.error(error));
  }

  ngOnInit() {
  }
}
interface IProduct {
  name: string;
  description: string;
  outOfStock: boolean;
  imageUrl: string;
  price: number;
}


