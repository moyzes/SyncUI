import { Pipe } from "@angular/core";

@Pipe({name : "replaceUnderscore"})
 
export class ReplaceUnderscore {
	transform(value: string){
		return value.replace(/_/g, " ");
	}
}