import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WorkoutService} from "../../services/mockworkout.service";
import {Workout} from "../../models/workout.interface";
import {Set} from "../../models/set.interface";
import * as moment from 'moment/moment';

/**
 * Generated class for the WorkoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
})
export class WorkoutPage {

  private workout: Workout;
  private sets: { isActive: boolean, set: Set}[];
  private currentIndex: number = 0;
  private interval: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private workoutService: WorkoutService) {
  }

  ionViewWillEnter() {
    this.fetchData();
  }

  fetchData() {
    clearInterval(this.interval);

    this.workoutService.getWorkout(this.navParams.get('id')).subscribe(
      data => {
        this.workout = data;
        this.sets = data.sets.map(i => ({isActive: false, set: i}));
      });
  }


  ionViewDidLoad() {
  }

  reorderItems(indexes) {
    let element = this.sets[indexes.from];
    this.sets.splice(indexes.from, 1);
    this.sets.splice(indexes.to, 0, element);
    this.reorderModel(indexes);
  }

  reorderModel(indexes) {
    let el = this.workout.sets[indexes.from];
    this.workout.sets.splice(indexes.from, 1);
    this.workout.sets.splice(indexes.to, 0, el);
    this.workoutService.saveWorkout(this.workout);
  }

  calculateDuration(ISOString: string): number {
    let time = moment(ISOString);
    let duration = moment.duration({minutes: time.minutes(), seconds: time.seconds()});
    return duration.asMilliseconds();
  }

  decrementDuration(set: Set): boolean {
    if (this.calculateDuration(set.duration) > 0) {
      set.duration = moment(set.duration).subtract(1, 'seconds').format();
      return true;
    }
    return false;
  }

  reset() {
    this.currentIndex = 0;
    this.fetchData();
  }

  onStartWorkout() {
    this.reset();
    this.sets[0].isActive = true;
    this.interval = setInterval(() => {
      if (this.currentIndex < this.sets.length && !this.decrementDuration(this.sets[this.currentIndex].set)) {
        if (this.currentIndex >= this.sets.length) {
          clearInterval(this.interval);
        } else {
          this.sets[this.currentIndex++].isActive = false;
          if (this.currentIndex < this.sets.length) {
            this.sets[this.currentIndex].isActive = true;
          }

        }
      }
    }, 1000);
  }

}
