import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { getformData } from 'src/app/Store/Form-post/Form.Selector'
import { FormService } from 'src/app/services/form.service'
import { ImageService } from 'src/app/services/image.service'

@Component({
  selector: 'app-banner-creator',
  templateUrl: './banner-creator.component.html',
  styleUrls: ['./banner-creator.component.css'],
})
export class BannerCreatorComponent implements OnInit, OnDestroy {
  imageSrcSubscription!: Subscription

  imageSrc: string = ''
  formData!: any
  selectedLabels: string[] = []

  constructor(
    private imageService: ImageService,
    private store: Store,
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    // Subscribe to changes in the exampleForm from FormService
    // this.formService.exampleForm.subscribe((newForm: any) => {
    //   this.exampleForm = newForm
    // })
    this.store.select(getformData).subscribe((item) => {
      this.formData = item
      // console.log(this.formData)
    })

    // Subscribe to changes in the imageSrc from ImageService
    this.imageSrcSubscription = this.imageService.imageSrc$.subscribe(
      (newImageSrc: string) => {
        this.imageSrc = newImageSrc
      },
    )

    this.selectedLabels = this.formService.selectedLabels
  }

  ngOnDestroy(): void {
    this.imageSrcSubscription.unsubscribe()
  }
}
