import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

import { ChannelService } from '../services/channel.service';
import { Channel } from '../domain/channel.domain';
import { DataTag } from '../domain/tag.domain';


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

	//Dialog references for both delete and new datatag windows
	public dfDelete: MdDialogRef<DeleteChannelDialog> | null;
	public dfNewTag: MdDialogRef<NewTagDialog> | null;
	public dfDeleteTag: MdDialogRef<DeleteTagDialog> | null;

	constructor(public channelService: ChannelService, public dialog: MdDialog) { }

	//Save channel; returns a promise of the outcome.
	saveChannel(){

		//Send it to the REST point.
		this.channelService.saveChannel(this.channel).then(function(response){
			this.notify.emit(response);
			this.channel = response;
		}.bind(this));
	}

	//Confirmation dialog for channel deletion.
	deleteChannelWarning(){
		this.dfDelete = this.dialog.open(DeleteChannelDialog);
		this.dfDelete.componentInstance.parentChannel = this.channel;
		this.dfDelete.componentInstance.dialog = this.dialog;
		this.dfDelete.componentInstance.notify = this.notify;
	}

	newTagDialog(){
		this.dfNewTag = this.dialog.open(NewTagDialog);
		this.dfNewTag.componentInstance.parentChannel = this.channel;
		this.dfNewTag.componentInstance.dialog = this.dialog;
	}

	deleteTagDialog(i: number){
		this.dfDeleteTag = this.dialog.open(DeleteTagDialog);
		this.dfDeleteTag.componentInstance.parentChannel = this.channel;
		this.dfDeleteTag.componentInstance.tagIndex = i;
		this.dfDeleteTag.componentInstance.dialog = this.dialog;
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

	public parentChannel: Channel;
	public dialog: MdDialog;
	public notify: EventEmitter<string>;

	constructor(public channelService: ChannelService) { }

	//Calls channel deletion from services.
	deleteChannel(){
		this.channelService.deleteChannel(this.parentChannel.id.toString()).then(function(){
			this.notify.emit('channel_deleted');
			this.dialog.closeAll();
		}.bind(this));
	}
}

/**
 * New tag dialog
 */
@Component({
	selector: 'new-data-tag',
	templateUrl: './dialog-new-tag.html',
	styleUrls: ['./edit-channel.css']
})
export class NewTagDialog {

	public parentChannel: Channel;
	public dialog: MdDialog;
	public tag: DataTag = new DataTag()

	constructor() { }

	addTag():void {
		this.parentChannel.dataTags.push(this.tag);
		this.dialog.closeAll();
	}
}

/**
 * Delete tag confirmation dialog.
 */
@Component({
	selector: 'delete-data-tag',
	templateUrl: './dialog-delete-tag.html',
	styleUrls: ['./edit-channel.css']
})
export class DeleteTagDialog {

	public parentChannel: Channel;
	public dialog: MdDialog;
	public tagIndex: number;

	constructor() { }

	deleteTag():void {
		console.log(this.tagIndex);
		this.parentChannel.dataTags.splice(this.tagIndex, 1);
		this.dialog.closeAll();
	}
}