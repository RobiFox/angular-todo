import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import {Button, ButtonDirective} from "primeng/button";
import { ListCardComponent } from './list-card/list-card.component';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import { IndividualCardComponent } from './individual-card/individual-card.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {DragDropModule} from "primeng/dragdrop";
import {Ripple} from "primeng/ripple";
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {ContextMenuModule} from "primeng/contextmenu";
import {DialogModule} from "primeng/dialog";
import {ColorPickerModule} from "primeng/colorpicker";
import {VirtualScrollerModule} from "primeng/virtualscroller";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListCardComponent,
    IndividualCardComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        Button,
        CardModule,
        InputTextModule,
        InputTextareaModule,
        DragDropModule,
        Ripple,
        ButtonDirective,
        FormsModule,
        ContextMenuModule,
        DialogModule,
        ColorPickerModule,
        VirtualScrollerModule
    ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
