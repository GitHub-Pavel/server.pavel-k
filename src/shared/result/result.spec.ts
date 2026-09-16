import { Result } from './result';
import { InvalidOperationError } from './invalidOperation.error';

describe('Result', () => {
  const isEqual = (a: unknown, b: unknown): Result<boolean> => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Result.Err(new Error('B is not a number'));
    }
    return Result.Ok(a === b);
  };

  it('should be empty success', () => {
    const r = Result.Ok();
    expect(r.isOk).toBeTruthy();
    expect(r.isErr).toBeFalsy();
    expect(() => r.unwrap()).not.toThrow();
    expect(r.unwrap()).toBeUndefined();
  });

  it('should be success with value', () => {
    const r = Result.Ok('Test');
    expect(r.isOk).toBeTruthy();
    expect(r.isErr).toBeFalsy();
    expect(r.unwrap()).toBe('Test');
    expect(r.error).toBeUndefined();
  });

  it('Empty fail should throw', () => {
    // @ts-expect-error
    expect(() => Result.Err()).toThrow(InvalidOperationError);
  });

  it('should be fail with error', () => {
    const err = new Error('example');
    const r = Result.Err(err);
    expect(r.isErr).toBeTruthy();
    expect(r.isOk).toBeFalsy();
  });

  it('unwrap', () => {
    const successResult = isEqual(10, 2);
    expect(successResult.unwrap()).toBe(false);

    const errResult = isEqual(10, null);
    expect(errResult.isErr).toBeTruthy();
    expect(() => errResult.unwrap()).toThrow();
  });

  it('unwrapOrElse', () => {
    const spy = jest.fn();
    const success = Result.Ok('v');
    expect(success.unwrapOrElse(spy)).toBe('v');
    expect(spy).not.toHaveBeenCalled();
    const err = new Error('origin');
    const fail = Result.Err(err);
    expect(() => fail.unwrapOrElse(spy)).not.toThrow();
    expect(spy).toHaveBeenCalledWith(err);
  });

  it('expect', () => {
    const customError = new Error('custom');
    const success = Result.Ok('v');
    expect(success.expect(customError)).toBe('v');
    const fail = Result.Err(new Error('origin'));
    expect(() => fail.expect(customError)).toThrow(customError);
  });

  it('combine', () => {
    let results = [1, 2].map((v) => isEqual(v, 2));
    let r = Result.combine(results);
    expect(r.isOk).toBeTruthy();

    results = [1, 'something'].map((v) => isEqual(v, 2));
    r = Result.combine(results);
    expect(r.isOk).toBeFalsy();
  });

  it('map', () => {
    const spy = jest.fn();
    const r = Result.Ok(1);
    // eslint-disable-next-line no-param-reassign
    const mapped = r.map((v) => ++v).map((v) => v * 2);
    expect(mapped.unwrap()).toBe(4);

    const errorResult = Result.Err(new Error('some err'));
    expect(() => errorResult.map(spy)).not.toThrow('some err');
    expect(spy).not.toHaveBeenCalled();
  });
});
