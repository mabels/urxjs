import { assert } from 'chai';
import * as rxjs from 'rxjs';
import * as urxjs from '../lib/urxjs';
import * as rx from '../lib/abstract-rx';

describe('rx-tests', () => {

  it('subject urxjs', (done) => {
    rx.inject(urxjs);
    const sub = new rx.Subject<string>();
    let completed: string;
    sub.subscribe((data) => {
      assert.equal('simple', data);
      completed = data;
    }, error => {
      assert.fail();
    }, () => {
      assert.equal('simple', completed);
      done();
    });
    sub.next('simple');
    sub.complete();
  });

  it('subject rxjs', (done) => {
    rx.inject(rxjs);
    const sub = new rx.Subject<string>();
    let completed: string;
    sub.subscribe((data) => {
      assert.equal('simple', data);
      completed = data;
    }, error => {
      assert.fail();
    }, () => {
      assert.equal('simple', completed);
      done();
    });
    sub.next('simple');
    sub.complete();
  });

});
