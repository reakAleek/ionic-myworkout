import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewWorkoutPage} from "../new-workout/new-workout";
import {WorkoutService} from "../../services/mockworkout.service";
import {Workout} from "../../models/workout.interface";
import {WorkoutPage} from "../workout/workout";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  workouts: Workout[] = [];

  constructor(public navCtrl: NavController, private workoutService: WorkoutService) {

  }

  ionViewWillEnter() {
    this.workoutService.getWorkouts().subscribe(data => { this.workouts = data });
  }



  deleteWorkout(index) {

    this.workoutService.deleteWorkout(this.workouts[index].id)
      .subscribe(
        success => { this.workouts.splice(index, 1); },
        error => { console.log(error) }
      );
  }

  onNavigateToAddWorkout(index: number = null) {

    if (index == null) {
      this.navCtrl.push(NewWorkoutPage);
    }
    else {
      this.navCtrl.push(NewWorkoutPage, {id: this.workouts[index].id});
    }

  }

  onNavigateToWorkout(index: number) {
    this.navCtrl.push(WorkoutPage, {id: this.workouts[index].id});
  }
}
