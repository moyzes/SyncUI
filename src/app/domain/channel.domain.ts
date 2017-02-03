import { DataTag } from "./tag.domain";

export class Channel {

	public id: number;
	public documentName: string;
	public integrationName: string;
	public localQueue: string;
	public splitXPathExpression: string;
	public systemName: string;
	public dataTags: DataTag[] = [];
	
	constructor(
		
		id?: number,
		documentName?: string,
		integration?: string,
		queue?: string,
		xpath?: string,
		system?: string){

		this.id = id;
		this.documentName = documentName;
		this.integrationName = integration;
		this.localQueue = queue;
		this.splitXPathExpression = xpath;
		this.systemName = system;

	}

	hasDocument(){
		return this.documentName != "";
	}

	addTag(tag: DataTag){
		this.dataTags.push(tag);
	}
}