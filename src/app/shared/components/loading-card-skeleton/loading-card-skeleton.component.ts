import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading-card-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './loading-card-skeleton.component.html',
  styleUrl: './loading-card-skeleton.component.scss'
})
export class LoadingCardSkeletonComponent {
  @Input() isLoading: boolean = false;

}
