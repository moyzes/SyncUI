export class DataTag {

	public id: number;
	public name: string;
	public regex: string;
	public identity: string;
	public multiple: boolean;

	constructor(

		id?: number,
		name?: string,
		regex?: string,
		identity?: string,
		multiple?: boolean){

		this.id = id;
		this.name = name;
		this.regex = regex;
		this.identity = identity || "";
		this.multiple = multiple || false;

	}

}