import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import {Button} from "primeng/button";
import { ListCardComponent } from './list-card/list-card.component';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import { IndividualCardComponent } from './individual-card/individual-card.component';
import {InputTextareaModule} from "primeng/inputtextarea";

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
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
