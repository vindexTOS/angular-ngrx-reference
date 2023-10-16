import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './Material.Module'
import { FormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { NavbarComponent } from './helper-component/navbar/navbar.component'
import { FooterComponent } from './helper-component/footer/footer.component'
import { DashboardComponent } from './main-component/dashboard/dashboard.component'
import { MatIconModule } from '@angular/material/icon'

import { BannerFormComponent } from './main-component/banner-form/banner-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BannerCreatorComponent } from './main-component/banner-creator/banner-creator.component'
import { FormReducer } from './Store/Form-post/Form.Reducer'
import { RefrenceReducer } from './Store/Refrence/Refrence.Reducer'
import { RefrenceEffects } from './Store/Refrence/Refrence.Effects'
import { BannerListComponent } from './main-component/banner-list/banner-list.component'
import { BlobEffects } from './Store/Blob/Blob.effect'
import { BlobReducer } from './Store/Blob/Blob.reducer'
import { FormEffect } from './Store/Form-post/Form.Effects'
import { LoadingComponent } from './helper-component/loading/loading.component'
import { StatusReducer } from './Store/StatusHanndle/Status.reducer'
import { ErrorComponent } from './helper-component/error/error.component'
import { SuccsessComponent } from './helper-component/succsess/succsess.component'
import { BannerEffect } from './Store/Banner-data/Banner.effect'
import { BannerReducer } from './Store/Banner-data/Banner.reducer'
import { SelectFieldComponent } from './helper-component/select-field/select-field.component'
import { SingleBannerComponent } from './helper-component/single-banner/single-banner.component'

import { EditableSelectorFieldComponent } from './helper-component/editable-selector-field/editable-selector-field.component'
import { FormDrawerComponent } from './helper-component/form-drawer/form-drawer.component';
import { LoadingSkeletonComponent } from './helper-component/loading-skeleton/loading-skeleton.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,

    BannerFormComponent,
    BannerCreatorComponent,
    BannerListComponent,
    LoadingComponent,
    ErrorComponent,
    SuccsessComponent,
    SelectFieldComponent,
    SingleBannerComponent,

    EditableSelectorFieldComponent,
    FormDrawerComponent,
    LoadingSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        formselector: FormReducer,
        refrence: RefrenceReducer,
        imagedata: BlobReducer,
        statusselector: StatusReducer,
        bannerdataselector: BannerReducer,
      },
      {},
    ),

    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([
      RefrenceEffects,
      BlobEffects,
      FormEffect,
      BannerEffect,
    ]),
    StoreRouterConnectingModule.forRoot(),
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
