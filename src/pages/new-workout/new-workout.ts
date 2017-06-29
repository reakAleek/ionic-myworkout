import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  private workoutExists: boolean = false;
  constructor(
    private workoutService: WorkoutService,
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {
    this.workoutForm = this.initForm();
    this.sets = <FormArray>this.workoutForm.controls['sets'];
    if (navParams.get("name") !== undefined) {
      this.workoutService.getWorkout(navParams.get("name")).subscribe(data => {

        this.workoutExists = true;
        this.workoutForm.get("name").setValue(data.name);
        data.sets.forEach((i,index) => {
          this.addSet(i);
          this.durations[index] = i.duration;
        });
      });
    }
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
      exercise: ['', Validators.required],
      duration: this.generateDuration(0,0),
    });

    if (set != null) {
      result.get("exercise").setValue(set.exercise);
      result.get("duration").setValue(set.duration);
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

    if (this.workoutExists) {
      this.workoutService.updateWorkout(workout).subscribe(
        success => { this.navCtrl.pop() },
        error => { console.log(error); }
      );
    }
    else {
      this.workoutService.createWorkout(workout).subscribe(
        (success) => { this.navCtrl.pop() },
        (error) => {
          let alert = this.alertCtrl.create({
            title: `Failed`,
            subTitle: error.toString(),
            buttons: ['OK']
          });
          alert.present();
        }
      );
    }
  }
}
