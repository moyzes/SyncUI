import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Channel } from '../domain/channel.domain';

@Component({
	selector: 'channel-form',
	templateUrl: './edit-channel.html',
	styleUrls: ['./edit-channel.css']
})
export class EditChannel {

	@Input()
	channel: Channel;

	runForm(form: NgForm){
		console.log(form.value);
	}
}