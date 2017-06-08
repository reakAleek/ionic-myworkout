import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WorkoutService} from "../../services/mockworkout.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment/moment';
import {Workout} from "../../models/workout.interface";
import {Set} from "../../models/set.interface";
import {Exercise} from "../../models/exercise.interface";
/**
 * Generated class for the NewWorkoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-workout',
  templateUrl: 'new-workout.html',
})
export class NewWorkoutPage {

  private workoutForm: FormGroup;
  private sets: FormArray;
  private durations: string[] = [];

  constructor(
    private workoutService: WorkoutService,
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.workoutForm = this.initForm();
    this.sets = <FormArray>this.workoutForm.controls['sets'];
  }

  ionViewDidLoad() {
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      sets: this.formBuilder.array([])
    });
  }

  setDuration(index: number) {
    this.sets.at(index).get("duration").setValue(this.durations[index]);
  }

  generateDuration(minutes: number, seconds: number): string {
    let duration = moment();
    duration.seconds(seconds);
    duration.minutes(minutes);
    return duration.toISOString();
  }

  initSet(set: Set = null) {

    let result = this.formBuilder.group({
      exercise: this.initExercise(),
      duration: this.generateDuration(0,0),
    });

    if (set != null) {
      result.get("exercise").setValue(set.exercise);
    }

    return result;
  }

  initExercise(exercise: Exercise = null) {

    let result = this.formBuilder.group({
      name: ['', Validators.required]
    });

    if (exercise != null) {
      result.get("name").setValue(exercise.name);
    }

    return result;
  }



  addSet(set: Set = null) {
    this.sets.push(this.initSet(set));
  }

  removeSet(i: number) {
    this.sets.removeAt(i);
  }

  onSaveWorkout() {
    let workout : Workout = this.workoutForm.value;
    workout.sets.forEach(i => {
      if (i.duration === undefined) {
        i.duration = this.generateDuration(0,0);
      }
    });
    this.workoutService.addWorkout(workout).subscribe(
      success => { this.navCtrl.pop() },
      error => { console.log(error) }
    );
  }
}
