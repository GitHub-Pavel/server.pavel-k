import { InvalidOperationError } from './invalidOperation.error';

export class Ok<V, E> {
  readonly #value: V;
  readonly ok = true;

  get error() {
    return undefined;
  }

  constructor(v: V) {
    this.#value = v;
    this.ok = true;
  }
  unwrap() {
    return this.#value;
  }
  unwrapOr() {
    return this.#value;
  }

  unwrapOrElse() {
    return this.#value;
  }

  expect(): V {
    return this.#value;
  }

  match<U>(cases: { ok: (value: V) => U; err: (err: E) => U }): U {
    return cases.ok(this.#value);
  }
}

export class Fail<V, E = unknown> {
  readonly error: E;
  readonly ok: false;
  constructor(err: E) {
    if (!err) {
      throw new InvalidOperationError('A failing result needs to contain an error');
    }
    this.error = err;
    this.ok = false;
  }

  unwrap(): never {
    throw this.error as Error;
  }

  unwrapOr(v: V) {
    return v;
  }

  unwrapOrElse(fn: (e: E) => V) {
    return fn(this.error);
  }
  expect(err: Error): never {
    throw err;
  }

  match<U>(cases: { ok: (value: V) => U; err: (err: E) => U }): U {
    return cases.err(this.error);
  }
}
