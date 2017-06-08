import {Workout} from "../models/workout.interface";
import {Exercise} from "../models/exercise.interface";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class WorkoutService {
  private workouts: Workout[] = [];

  constructor(private http: Http) {

    let exercise1: Exercise = { id: 0, name: "exercise1", description: ""};
    let exercise2: Exercise = { id: 1, name: "exercise2", description: ""};
    let exercise3: Exercise = { id: 3, name: "exercise3", description: ""};


    let workout : Workout = {
      id: 0,
      name:"TestWorkout",
      sets: [
        {id: 0,exercise: exercise1, duration: '2017-06-07T23:00:10.828Z'},
        {id: 1,exercise: exercise2, duration: '2017-06-07T23:00:15.828Z'},
        {id: 2,exercise: exercise3, duration: '2017-06-07T23:00:05.828Z'},
      ]
    };

    this.workouts.push(workout);
    let clone = JSON.parse(JSON.stringify(workout));
    clone.name = "TestWorkout2";
    clone.id = 1;
    this.workouts.push(clone);

  }

  addWorkout(workout: Workout): Observable<Workout> {
    workout.id = this.workouts.length;
    this.workouts.push(workout);
    return Observable.of(workout);
  }

  saveWorkout(workout: Workout): Observable<Workout> {
    let tmpWorkout = this.workouts.find(i => i.id == workout.id);
    tmpWorkout.name = workout.name;
    tmpWorkout.sets = workout.sets;
    return Observable.of(workout);
  }

  deleteWorkout(id: number): Observable<any> {
    this.workouts = this.workouts.filter(i => i.id == id);
    return Observable.of(true);
  }

  getWorkouts() : Observable<Workout[]> {

    return Observable.of(this.workouts.slice());
  }

  getWorkout(id: number): Observable<Workout> {
    return Observable.of(this.workouts.find(i => i.id == id));
  }

}
