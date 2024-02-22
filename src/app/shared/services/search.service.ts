import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new Subject<{ field: "title" | "category", value: string }>();

  searchEvent$ = this.searchSubject.asObservable();

  emitSearch(searchObject: any) {
    this.searchSubject.next(searchObject);
  }
}
