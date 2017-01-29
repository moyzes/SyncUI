
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Channel } from '../domain/channel.domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChannelService { 

    private channelList = 'http://localhost:3000/api/channels'
    private channelSave = 'api/channel'

    constructor(private http: Http) { }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getChannels(): Promise<Channel[]> {
        return this.http.get(this.channelList).map((res) => {
			return res.json()
		}).toPromise();
    }
}