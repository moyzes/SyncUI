export class Channel {

	public id: number;
	public documentName: string;
	public integration_name: string;
	public local_queue: string;
	public splitxpath_expression: string;
	public system_name: string;
	
	constructor(
		id?: number,
		documentName?: string,
		integration?: string,
		queue?: string,
		xpath?: string,
		system?: string){

		this.id = id;
		this.documentName = documentName;
		this.integration_name = integration;
		this.local_queue = queue;
		this.splitxpath_expression = xpath;
		this.system_name = system;
	}

	hasDocument(){
		return this.documentName != "";
	}
}