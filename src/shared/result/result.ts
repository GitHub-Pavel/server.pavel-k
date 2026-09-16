import { Fail, Ok } from './value';

type ResultValue<V, E> = Ok<V, never> | Fail<V, E>;
export type AsyncResult<V, E> = Promise<Result<V, E>>;

/**
 * The “Result Pattern” is an alternative to exception-based error handling. Instead of triggering exceptions, a special result object is returned that contains the success or failure of an operation as well as error information. This allows the normal program flow to run more smoothly.
 */
export class Result<V = void, E = unknown> {
  readonly #value: ResultValue<V, E>;

  public constructor(inner: ResultValue<V, E>) {
    this.#value = inner;
  }

  get isOk(): boolean {
    return this.#value.ok;
  }

  get isErr(): boolean {
    return !this.#value.ok;
  }

  get error() {
    return this.#value.error;
  }

  /**
   * Return value or throw error
   */
  unwrap() {
    return this.#value.unwrap();
  }

  /**
   * Return value or fallback
   * @param fallback
   */
  unwrapOr(fallback: V) {
    return this.#value.unwrapOr(fallback);
  }

  /**
   * Return value or call passed function with error as argument
   * @param fn
   */
  unwrapOrElse(fn: (err: E) => V) {
    return this.#value.unwrapOrElse(fn);
  }

  /**
   * Return value or throw passed error
   * @param err Error
   */
  expect(err: Error) {
    return this.#value.expect(err);
  }

  match<U>(cases: { ok: (v: V) => U; err: (err: E) => U }) {
    return this.#value.match(cases);
  }

  /**
   * Apply function to success value
   */
  map<N>(fn: (v: V) => N): Result<N, E> {
    if (this.isErr) {
      return Result.Err(this.error as E);
    }
    return Result.Ok(fn(this.unwrap()));
  }

  flatMap<N, F>(fn: (v: V) => Result<N, F>): Result<N, F> {
    return fn(this.unwrap());
  }

  async mapAsync<N>(fn: (v: V) => Promise<N>): AsyncResult<N, E> {
    if (this.isErr) {
      return Result.Err(this.error as E);
    }
    return Result.Ok(await fn(this.unwrap()));
  }

  flatMapAsync<N, F>(fn: (v: V) => AsyncResult<N, F>): AsyncResult<N, F> {
    if (this.isErr) {
      return Promise.resolve(Result.Err(this.error as F));
    }
    return fn(this.unwrap());
  }

  tap(fn: (v: V) => unknown): Result<V, E> {
    this.#value.match({ ok: fn, err: () => undefined });
    return this;
  }

  tapError(fn: (err: E) => unknown): Result<V, E> {
    this.#value.match({ ok: () => undefined, err: fn });
    return this;
  }

  mapError<N>(fn: (err: E) => N): Result<V, N> {
    if (this.isOk) {
      return this as unknown as Result<V, N>;
    }
    return Result.Err(fn(this.error as E));
  }

  orElse(fn: (err: E) => Result<V, E>): Result<V, E> {
    if (this.isOk) {
      return this;
    }
    return fn(this.error as E);
  }

  static Ok<U extends [undefined?] | [any]>(...args: U): Result<U[0], never> {
    return new Result<U, never>(new Ok(args[0]));
  }

  static Err<V, E>(error: E): Result<V, E> {
    return new Result<never, E>(new Fail(error));
  }

  static combine<U>(results: Result<U>[]): Result {
    for (const result of results) {
      if (result.isErr) {
        return result as Result<never, Error>;
      }
    }
    return Result.Ok();
  }

  static fromCatch<V, E = unknown>(fn: () => V, mapError?: (err: unknown) => E) {
    try {
      return Result.Ok(fn());
    } catch (err) {
      return Result.Err<V, E>(mapError ? mapError(err) : (err as E));
    }
  }

  static async fromAsync<V, E = unknown>(fn: () => Promise<V>, mapError?: (err: unknown) => E) {
    try {
      return Result.Ok(await fn());
    } catch (err) {
      return Result.Err<V, E>(mapError ? mapError(err) : (err as E));
    }
  }
}
