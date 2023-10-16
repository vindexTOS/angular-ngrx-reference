import { Component } from '@angular/core'

@Component({
  selector: 'app-loading-skeleton',
  templateUrl: './loading-skeleton.component.html',
  styleUrls: ['./loading-skeleton.component.css'],
})
export class LoadingSkeletonComponent {
  arr: any[] = Array(10).fill('')
}
