import { PriorityEnum, PriorityEnumLabel } from '@enums/priority';
import { PriorityTextPipe } from './priority-text.pipe';

describe('PriorityTextPipe', () => {
  let pipe: PriorityTextPipe;

  beforeEach(() => {
    pipe = new PriorityTextPipe();
  });

  it('should create the pipe instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform PriorityEnum.HIGH to label', () => {
    const result = pipe.transform(PriorityEnum.HIGH);
    expect(result).toBe(PriorityEnumLabel.get(PriorityEnum.HIGH));
  });

  it('should transform PriorityEnum.MEDIUM to label', () => {
    const result = pipe.transform(PriorityEnum.MEDIUM);
    expect(result).toBe(PriorityEnumLabel.get(PriorityEnum.MEDIUM));
  });

  it('should transform PriorityEnum.LOW to label', () => {
    const result = pipe.transform(PriorityEnum.LOW);
    expect(result).toBe(PriorityEnumLabel.get(PriorityEnum.LOW));
  });

  it('should return null if value is falsy', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeNull();
  });
});
