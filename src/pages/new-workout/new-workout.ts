import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {WorkoutService} from "../../services/workout.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment/moment';
import {Workout} from "../../models/workout.interface";
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
    private formBuilder: FormBuilder
  ) {
    this.workoutForm = this.initForm();
    this.sets = <FormArray>this.workoutForm.controls['sets'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewWorkoutPage');
    console.log(this.generateDuration(0,0));
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

  initSet() {
    return this.formBuilder.group({
      exercise: this.initExercise(),
      duration: this.generateDuration(0,0),
    });
  }

  initExercise() {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }



  addSet() {
    this.sets.push(this.initSet());
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
    this.workoutService.addWorkout(workout);
    this.navCtrl.pop();
  }
}
