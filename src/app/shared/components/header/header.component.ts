import { Component } from '@angular/core';
import {CartComponent} from "../cart/cart.component";
import {SearchInputComponent} from "../search-input/search-input.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CartComponent,
    SearchInputComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
