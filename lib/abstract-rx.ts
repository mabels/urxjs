
let impl: any = null;

export interface DataCallback {
  (data: any): void;
}

export interface CompletesCallback {
  (): void;
}

export class Subject<T> {
  private my: any;
  constructor() {
    this.my = new impl.Subject();
  }
  public complete(): void {
    this.my.complete();
  }
  public next(data: T): void {
    this.my.next(data);
  }
  public error(data: any): void {
    this.my.error(data);
  }
  public subscribe(cb: (data: T) => void, error?: (data: any) => void, complete?: () => void): void {
    this.my.subscribe(cb, error, complete);
  }
}

export class Observer<T> extends Subject<T> {
}

export class Observable<T> extends Subject<T> {
  public static create<T>(observer: (ob: Observer<T>) => void): Subject<T> {
    const s = new impl.Subject();
    observer(s);
    return s;
  }
}

export function inject(_rximpl: any): void {
  impl = _rximpl;
}
