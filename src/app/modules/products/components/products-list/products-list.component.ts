import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProductCardComponent} from "../porduct-card/product-card.component";
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import {
  LoadingCardSkeletonComponent
} from "../../../../shared/components/loading-card-skeleton/loading-card-skeleton.component";
import {HttpService} from "../../../../shared/services/http.service";
import {ErrorComponentComponent} from "../../../../shared/components/error-component/error-component.component";
import {SearchService} from "../../../../shared/services/search.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    NgForOf,
    ProductCardComponent,
    LoadingCardSkeletonComponent,
    NgIf,
    ErrorComponentComponent
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  animations: [
    trigger('fadeIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(100, [
            animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy{
  products: any[] = [];
  _loading = false;
  _hasError = false;
  _unSubscribeAll = new Subject<void>()
  constructor(
    private httpService: HttpService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this._loading = true;
    this.fetchProducts();

    this.searchService.searchEvent$.pipe(
      takeUntil(this._unSubscribeAll)
    ).subscribe(searchTerm => {
      this.handleSearchChange(searchTerm);
    });
  }

  fetchProducts(): void {
    this.httpService.getData<any>(['products']).pipe(
      takeUntil(this._unSubscribeAll)
    ).subscribe({
      next: (data: any) => {
        this.products = data;
        this._loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this._hasError = true;
        this._loading = false;
      }
    });
  }

  handleSearchChange(searchTerm: { field: 'title' | 'category', value: string }): void {
    if (searchTerm.field === 'category') {
      this._loading = true;
      this.httpService.getData<any>(['products',"category", searchTerm.value.toLowerCase()]).subscribe({
        next: (data: any) => {
          this.products = data ?? [];
          this._loading = false;
        },
        error: (err) => {
          console.error('Error fetching products by category:', err);
          this._hasError = true;
          this._loading = false;
        }
      });
      /**
       * Filter products by title
       * But since the API doesn't support  searching using the title So the search will be a dummy implementation
       * on the front-end only
       */
    } else {
      this.products = this.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    }
  }

  ngOnDestroy() {
    this._unSubscribeAll.next();
  }
}
