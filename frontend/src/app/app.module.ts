import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NoteService } from './services/note.service';
import { ReminderService } from './services/reminder.service';

import { NoteComponent } from './note/note.component';
import { ReminderComponent } from './reminder/reminder.component';
import { TaskComponent } from './task/task.component';
import { RoutineComponent } from './routine/routine.component';
import { TheaterComponent } from './theater/theater.component';
import { VrComponent } from './vr/vr.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NoteComponent,
    ReminderComponent,
    TaskComponent,
    RoutineComponent,
    TheaterComponent,
    VrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    NoteService,
    ReminderService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
