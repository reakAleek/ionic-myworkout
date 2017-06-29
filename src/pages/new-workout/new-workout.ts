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
  private id: number;

  constructor(
    private workoutService: WorkoutService,
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.workoutForm = this.initForm();
    this.sets = <FormArray>this.workoutForm.controls['sets'];

    if (navParams.get("id") !== undefined) {
      this.workoutService.getWorkout(navParams.get("id")).subscribe(data => {

        console.log(data);
        this.workoutForm.get("name").setValue(data.name);
        this.id = data.id;
        data.sets.forEach((i,index) => {
          this.addSet(i);
          this.durations[index] = i.duration;
        });
      });
    }

    /*
    if (navParams.get("id") !== undefined) {
      this.workoutService.getWorkout(navParams.get("id")).subscribe(data => {
        console.log(data.name);
        this.workoutForm.get("name").setValue(data.name);
        data.sets.forEach((i,index) => {
          this.addSet(i);
          this.durations[index] = i.duration;
        });
        this.id = data.id;
      });
    }*/
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

  reorderItems(indexes) {
    /*let element = this.sets[indexes.from];
    this.sets.splice(indexes.from, 1);
    this.sets.splice(indexes.to, 0, element);*/
  }


  addSet(set: Set = null) {
    this.sets.push(this.initSet(set));
  }

  initSet(set: Set = null) {


    let result = this.formBuilder.group({
      exercise: this.initExercise(),
      duration: this.generateDuration(0,0),
    });

    if (set != null) {
      result.get("exercise").get("name").setValue(set.exercise.name);
      result.get("duration").setValue(set.duration);
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

    if (this.id != null) {
      workout.id = this.id;
      this.workoutService.saveWorkout(workout).subscribe(
        success => { this.navCtrl.pop() },
        error => { console.log(error); }
      );
    }
    else {
      this.workoutService.addWorkout(workout).subscribe(
        success => { this.navCtrl.pop() },
        error => { console.log(error) }
      );
    }
  }
}
