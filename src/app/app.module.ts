import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app.component'
import {CalcComponent} from './calc.component'
@NgModule({
	imports:[BrowserModule],
	declarations:[AppComponent,CalcComponent],
	bootstrap:[AppComponent]
})
export class AppModule{}

