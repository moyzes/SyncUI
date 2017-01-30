import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdDialogRef } from '@angular/material';

import { AppComponent } from './app.component';
import { ChannelService } from './services/channel.service';
import { EditChannel, DeleteChannelDialog } from './form/edit-channel.component';
import { ReplaceUnderscore } from './pipes/replace-underscore';

@NgModule({
	declarations: [
		AppComponent, 
		EditChannel,
		ReplaceUnderscore,
		DeleteChannelDialog
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule.forRoot()
	],
	providers: [ChannelService],
	entryComponents: [DeleteChannelDialog],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }