import {Workout} from "../models/workout.interface";
import {Exercise} from "../models/exercise.interface";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class WorkoutService {
  private workouts: Workout[] = [];

  constructor(private http: Http) {


    let workout : Workout = {
      name:"TestWorkout",
      sets: [
        {id: 0,exercise: "exercise 1", duration: '2017-06-07T23:00:10.828Z'},
        {id: 1,exercise: "exercise 2", duration: '2017-06-07T23:00:15.828Z'},
        {id: 2,exercise: "exercise 3", duration: '2017-06-07T23:00:05.828Z'},
      ]
    };

    this.workouts.push(workout);
    let clone = JSON.parse(JSON.stringify(workout));
    clone.name = "TestWorkout2";
    clone.id = 1;
    this.workouts.push(clone);

  }

  createWorkout(workout: Workout): Observable<Workout> {

    if (this.workouts.filter(i => i.name == workout.name).length > 0) {
      return Observable.throw({status: 404});
    }

    this.workouts.push(workout);
    return Observable.of(workout);
  }

  updateWorkout(workout: Workout): Observable<Workout> {
    let tmpWorkout = this.workouts.find(i => i.name == workout.name);
    tmpWorkout.name = workout.name;
    tmpWorkout.sets = workout.sets;
    return Observable.of(workout);
  }

  deleteWorkout(name: string): Observable<any> {
    this.workouts = this.workouts.filter(i => i.name == name);
    return Observable.of(true);
  }

  getWorkouts() : Observable<Workout[]> {
    return Observable.of(this.workouts.slice());
  }

  getWorkout(name: string): Observable<Workout> {
    return Observable.of(this.workouts.find(i => i.name == name));
  }

}
