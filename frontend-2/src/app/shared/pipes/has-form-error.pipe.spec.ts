import { HasFormErrorPipe } from './has-form-error.pipe';

describe('HasFormErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new HasFormErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
