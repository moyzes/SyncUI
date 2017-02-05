import { Component, Input } from '@angular/core';

import { ReplaceUnderscore } from './pipes/replace-underscore';
import { EditChannel } from './form/edit-channel.component';
import { ChannelService } from './services/channel.service';
import { Channel } from './domain/channel.domain';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-root',
	providers: [ChannelService],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	channels: Channel[];
	selectedChannel: Channel;
	errorMessage: any;

	constructor(private channelService: ChannelService) {
		this.listChannels();
    }

	listChannels(){
		this.channelService.getChannels().then(function(data){
			this.channels = data;
		}.bind(this));
	}

	onSelect(channel: Channel): void {
		this.selectedChannel = channel;
	}

	newChannel(): void {
		this.onSelect(new Channel());
	}

	onNotify(message: any):void {
		this.listChannels();
		if (message === "channel_deleted") {
			this.selectedChannel = null;
		}
	}
}
