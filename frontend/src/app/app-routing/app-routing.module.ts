import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { NoteComponent } from '../note/note.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { TaskComponent } from '../task/task.component';
import { RoutineComponent } from '../routine/routine.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'note', component: NoteComponent },
  { path: 'reminder', component: ReminderComponent },
  { path: 'task', component: TaskComponent },
  { path: 'routine', component: RoutineComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
