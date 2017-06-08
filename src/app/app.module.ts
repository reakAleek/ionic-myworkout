import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {NewWorkoutPage} from "../pages/new-workout/new-workout";
import {WorkoutService} from "../services/workout.service";
import {WorkoutPage} from "../pages/workout/workout";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewWorkoutPage,
    WorkoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewWorkoutPage,
    WorkoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WorkoutService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
