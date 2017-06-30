import {Observable} from "rxjs";
import {Workout} from "../models/workout.interface";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
/***
 * Created by jancalanog on 08.06.17.
 */
@Injectable()
export class RealWorkoutService {
  private readonly url = 'http://localhost:8080/mw-be/';

  constructor(private http: Http) {

  }

  createWorkout(workout: Workout): Observable<Workout> {
    let bodyString = JSON.stringify(workout);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url + 'create_workout/', bodyString, options)
      .map((response: Response) => response.json());
  }

  updateWorkout(workout: Workout): Observable<Workout> {
    let bodyString = JSON.stringify(workout);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});

    console.log("update_workout called");

    return this.http.post(this.url + 'update_workout', bodyString, options)
      .map((response: Response) => response.json());
  }

  deleteWorkout(name: string): Observable<any> {
    return this.http.get(this.url + 'delete_workout/' + name)
      .map((response: Response) => response.json());
  }

  getWorkouts(): Observable<Workout[]> {
    return this.http.get(this.url + 'get_workouts')
      .map((response: Response) => response.json());
  }

  getWorkout(name: string): Observable<Workout> {
    return this.http.get(this.url + 'get_workout/' + name)
      .map((response: Response) => response.json());
  }
}
