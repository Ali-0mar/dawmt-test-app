import { Component } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  itemsCount: number = 0;
  private itemsCountSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.itemsCountSubscription = this.cartService.getItemsCount().subscribe(count => {
      this.itemsCount = count;
    });
  }

  ngOnDestroy() {
    this.itemsCountSubscription.unsubscribe();
  }
}
