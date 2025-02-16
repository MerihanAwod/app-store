import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/interfaces/product'; // Import your Product interface

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      # ... other fields to be defined and confirmed with Ayman
    }
  }
`;

@Injectable({
  providedIn: 'root', // Or provide in your feature module
})
export class ProductsGqlService {
  constructor(private apollo: Apollo) {}

  getProducts(): Observable<Product[]> {
    return this.apollo.watchQuery({ query: GET_PRODUCTS })
      .valueChanges.pipe(map((result: any) => result.data.products));
  }

  // Add more methods for other queries (getProductById, etc.) and mutations
}
