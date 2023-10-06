import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CounterbuttonComponent } from './component/counterbutton/counterbutton.component'
import { CounterdisplayComponent } from './component/counterdisplay/counterdisplay.component'
import { counterReducer } from './shared/store/counter.reducer'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './Material.Module'
import { CustomcounterComponent } from './component/customcounter/customcounter.component'
import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    CounterbuttonComponent,
    CounterdisplayComponent,
    CustomcounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ counter: counterReducer }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
