import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ChannelService } from '../services/channel.service';
import { Channel } from '../domain/channel.domain';

@Component({
	selector: 'channel-form',
	templateUrl: './edit-channel.html',
	styleUrls: ['./edit-channel.css']
})
export class EditChannel {

	@Input()
	channel: Channel;

	@Output() 
	notify: EventEmitter<string> = new EventEmitter<string>();

	constructor(private channelService: ChannelService) { }

	runForm(form: NgForm){
		this.channelService.saveChannel(form.value).then(function(response){
			this.notify.emit('ok');
		})
		.catch(function(){
			this.notify.emit('error');
		}.bind(this));
	}
}