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
import { NavbarComponent } from './client-component/navbar/navbar.component'
import { FooterComponent } from './client-component/footer/footer.component'
import { DashboardComponent } from './admin-component/dashboard/dashboard.component'
import { MatIconModule } from '@angular/material/icon'
import { MainComponent } from './client-component/main/main.component'
import { SidenavComponent } from './client-component/sidenav/sidenav.component'
import { HeroComponent } from './client-component/hero/hero.component'
import { BannerFormComponent } from './admin-component/banner-form/banner-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BannerCreatorComponent } from './admin-component/banner-creator/banner-creator.component'
import { FormReducer } from './Store/Form-post/Form.Reducer'
import { RefrenceReducer } from './Store/Refrence/Refrence.Reducer'
import { RefrenceEffects } from './Store/Refrence/Refrence.Effects'
import { BannerListComponent } from './admin-component/banner-list/banner-list.component'
import { BlobEffects } from './Store/Blob/Blob.effect'
import { BlobReducer } from './Store/Blob/Blob.reducer'
import { FormEffect } from './Store/Form-post/Form.Effects'
import { LoadingComponent } from './client-component/loading/loading.component'
import { StatusReducer } from './Store/StatusHanndle/Status.reducer';
import { ErrorComponent } from './client-component/error/error.component';
import { SuccsessComponent } from './client-component/succsess/succsess.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    MainComponent,
    SidenavComponent,
    HeroComponent,
    BannerFormComponent,
    BannerCreatorComponent,
    BannerListComponent,
    LoadingComponent,
    ErrorComponent,
    SuccsessComponent,
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
      },
      {},
    ),

    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([RefrenceEffects, BlobEffects, FormEffect]),
    StoreRouterConnectingModule.forRoot(),
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
