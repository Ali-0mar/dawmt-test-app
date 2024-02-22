import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject: BehaviorSubject<{ productId: number, quantity: number }[]> = new BehaviorSubject<{ productId: number, quantity: number }[]>([]);

  constructor() { }

  addItemToCart(productId: number) {
    const currentItems = this.itemsSubject.getValue();
    const index = currentItems.findIndex(item => item.productId === productId);

    if (index !== -1) {
      currentItems[index].quantity++;
    } else {
      currentItems.push({ productId, quantity: 1 });
    }

    this.itemsSubject.next(currentItems);
  }
  removeItemFromCart(productId: number) {
    let currentItems = this.itemsSubject.getValue();
    const index = currentItems.findIndex(item => item.productId === productId);

    if (index !== -1) {
      if (currentItems[index].quantity > 1) {
        currentItems[index].quantity -= 1;
      } else {
        currentItems = currentItems.filter(item => item.productId !== productId);
      }
      this.itemsSubject.next(currentItems);
    }
  }

  /**
   * I took the decision to add the get the number of total items here in case we need to know the number of elements in other places
   */
  getItemsCount(): Observable<number> {
    return this.itemsSubject.pipe(
      map(items => items.reduce((acc, item) => acc + item.quantity, 0))
    );
  }

}
