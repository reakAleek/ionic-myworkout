import {Workout} from "../models/workout.interface";
import {Exercise} from "../models/exercise.interface";

export class WorkoutService {
  private workouts: Workout[] = [];

  constructor() {

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
    this.workouts.push(clone);

  }

  addWorkout(workout: Workout): void {
    workout.id = this.workouts.length;
    this.workouts.push(workout);
  }

  saveWorkout(workout: Workout): void {
    let tmpWorkout = this.workouts.find(i => i.id == workout.id);
    tmpWorkout.name = workout.name;
    tmpWorkout.sets = workout.sets;
  }

  deleteWorkout(id: number) {
    this.workouts = this.workouts.filter(i => i.id == id);
  }

  getWorkouts() : Workout[] {
    return this.workouts.slice();
  }

  getWorkout(id: number): Workout {
    return this.workouts.find(i => i.id == id);
  }

}
