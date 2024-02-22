import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Subject} from "rxjs";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  showTextInput: boolean = false;
  searchValue: string = '';
  selectedField: string = '';
  searchSubject = new Subject<{ field: string, value: string }>();

  constructor( private searchService: SearchService) {}
  onSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    if (value) {
      this.selectedField = value;
      this.showTextInput = true;
    }
  }

  emitSearch() {
    if (this.selectedField) {
      const searchObject = {
        field: this.selectedField,
        value: this.searchValue.trim()
      };
      this.searchService.emitSearch(searchObject);
    }
  }
}
