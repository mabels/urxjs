
import * as abstractRx from './abstract-rx';

export class Subject<T> {
  private subscribes: abstractRx.DataCallback[];
  private completes: abstractRx.CompletesCallback[];
  private errors: abstractRx.DataCallback[];

  constructor() {
    this.subscribes = [];
    this.completes = [];
    this.errors = [];
  }
  public complete(): void {
    const cmplts = this.completes;
    this.completes = [];
    cmplts.forEach(cb => cb());
  }
  public next(data: T): void {
    this.subscribes.forEach(cb => cb(data));
  }
  public error(data: any): void {
    const errs = this.errors;
    this.errors = [];
    this.completes = [];
    errs.forEach(cb => cb(data));
  }
  public subscribe(cb: (data: T) => void, error?: (data: any) => void, complete?: () => void): void {
    if (cb) { this.subscribes.push(cb); }
    if (error) { this.errors.push(error); }
    if (complete) { this.completes.push(complete); }
  }
}

export class Observer<T> extends Subject<T> {

}

export class Observable<T> extends Subject<T> {
  public static create<T>(observer: (ob: Observer<T>) => void): Subject<T> {
    const s = new Subject<T>();
    observer(s);
    return s;
  }
}
