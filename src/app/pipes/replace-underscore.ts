import { Pipe } from "@angular/core";

@Pipe({name : "replaceUnderscore"})
 
export class ReplaceUnderscore {
	transform(value){
		return value.replace(/_/g, " ");
	}
}