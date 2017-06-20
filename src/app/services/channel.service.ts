
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Channel } from '../domain/channel.domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChannelService { 

    private headers: Headers;
    private options: RequestOptions;

    private channelList = 'http://segotl2011.got.volvo.net:8080/PdsCacheSync/channels'
    private channelSave = 'http://segotl2011.got.volvo.net:8080/PdsCacheSync/channel'
    private channelDelete = 'http://segotl2011.got.volvo.net:8080/PdsCacheSync/deleteChannel'

    constructor(private http: Http) { 
        this.headers = new Headers({'Content-Type': 'application/json', 'Accept': '*', 'Access-Control-Allow-Origin': '*'});
        this.options = new RequestOptions({headers: this.headers});
    }

    getChannels(): Promise<Channel[]> {
        let opt = new RequestOptions({headers: new Headers()});
        return this.http.get(this.channelList, this.options).map((res) => {
			return res.json()
		}).toPromise();
    }

    saveChannel(param: any): Promise<any> {
        let body = JSON.stringify(param);
        console.log(body);
        return this.http
            .post(this.channelSave, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteChannel(id: string): Promise<any> {
        return this.http
            .post(this.channelDelete, id, this.options)
            .toPromise().then();
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}