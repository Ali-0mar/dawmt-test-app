import {Component, Input} from '@angular/core';
import {CartService} from "../../../../shared/services/cart.service";
import IProduct from "../../interfaces/IProduct";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  constructor(private cartService: CartService) {}

  addToCart(productId: number) {
    this.cartService.addItemToCart(productId);
  }
  removeItemFromCart(productId: number) {
    this.cartService.removeItemFromCart(productId);
  }}
