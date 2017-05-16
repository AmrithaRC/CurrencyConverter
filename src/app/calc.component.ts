import {Component} from '@angular/core'

@Component({
	selector: 'my-calc',
	templateUrl: './calc.component.html',
	styleUrls: ['./calc.component.css']
})
export class CalcComponent{
	showErrorMsg:any = false;
	currencies= [
		{label:'USD',value:'USD'},
		{label:'CAD',value:'CAD'},
		{label:'EUR',value:'EUR'}
	];
	convertAmt(){

	}
	getCurrencyRates(){

	}
}