import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ChannelService } from '../services/channel.service';
import { Channel } from '../domain/channel.domain';
import { MdDialog, MdDialogRef } from '@angular/material';

/**
 * Main edit channel form component.
 */
@Component({
	selector: 'channel-form',
	templateUrl: './edit-channel.html',
	styleUrls: ['./edit-channel.css']
})
export class EditChannel {

	//Receives an event who passes the Channel object from form.
	@Input()
	channel: Channel;

	//Emits an event after saving channel
	@Output() 
	notify: EventEmitter<string> = new EventEmitter<string>();

	public dialogRef: MdDialogRef<DeleteChannelDialog>|null;

	constructor(
		public channelService: ChannelService, public dialog: MdDialog) { }

	//Save channel; returns a promise of the outcome.
	saveChannel(form: NgForm){
		this.channelService.saveChannel(form.value).then(function(response){
			this.notify.emit('ok');
		})
		.catch(function(){
			this.notify.emit('error');
		}.bind(this));
	}

	//Confirmation dialog for channel deletion.
	deleteChannelWarning(id: number){
		this.dialogRef = this.dialog.open(DeleteChannelDialog);
		this.dialogRef.componentInstance.channelId = id;
	}
}

/**
 * Confirmation dialog component.
 */
@Component({
	selector: 'dialog-delete-channel',
	templateUrl: './dialog-delete-channel.html',
	styleUrls: ['./edit-channel.css']
})
export class DeleteChannelDialog {

	channelId: number;

	constructor(public channelService: ChannelService) { }

	//Calls channel deletion form services.
	deleteChannel(){
		console.log(this.channelId);
		this.channelService.deleteChannel(this.channelId);
	}
}