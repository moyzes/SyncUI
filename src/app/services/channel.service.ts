
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Channel } from '../domain/channel.domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChannelService { 

    private headers: Headers;
    private options: RequestOptions;
    private channelList = 'http://localhost:3000/api/channels'
    private channelSave = 'http://localhost:3000/api/channel'

    constructor(private http: Http) { 
        this.headers = new Headers(
            {
                'Content-Type': 'application/json', 
                'Accept': 'q=0.8;application/json;q=0.9' 
            }
        );
        this.options = new RequestOptions({ headers: this.headers });
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getChannels(): Promise<Channel[]> {
        return this.http.get(this.channelList).map((res) => {
			return res.json()
		}).toPromise();
    }

    saveChannel(param: any): Promise<any> {
        
        let body = JSON.stringify(param);
        return this.http
            .post(this.channelSave, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}