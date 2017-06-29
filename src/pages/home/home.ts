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

    this.workoutService.deleteWorkout(this.workouts[index].name)
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
      this.navCtrl.push(NewWorkoutPage, {name: this.workouts[index].name});
    }

  }

  onNavigateToWorkout(index: number) {
    this.navCtrl.push(WorkoutPage, {name: this.workouts[index].name});
  }
}
