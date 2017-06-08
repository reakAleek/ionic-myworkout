import {Observable} from "rxjs";
import {Workout} from "../models/workout.interface";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Injectable} from "@angular/core";

/**
 * Created by jancalanog on 08.06.17.
 */
@Injectable()
export class RealWorkoutService {
  private readonly url = 'http://localhost:8080/mw/webapi/workouts/';

  constructor(private http: Http) {}

  addWorkout(workout: Workout): Observable<Workout> {
    let bodyString = JSON.stringify(workout);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url + workout.id, bodyString, options)
      .map((response: Response) => response.json());
  }

  saveWorkout(workout: Workout): Observable<Workout> {
    let bodyString = JSON.stringify(workout);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});

    return this.http.put(this.url + workout.id, bodyString, options)
      .map((response: Response) => response.json());
  }

  deleteWorkout(id: number) {
    return this.http.delete(this.url + id)
      .map((response: Response) => response.json());
  }

  getWorkouts(): Observable<Workout[]> {
    return this.http.get(this.url)
      .map((response: Response) => response.json());
  }

  getWorkout(id: number): Observable<Workout> {
    return this.http.get(this.url + id)
      .map((response: Response) => response.json());
  }

}
