import { describe } from 'node:test';
import { expect, test, it } from '@jest/globals';
import User from '../../../entity/user';

describe('User', () => {
  let user: User;

  it('should create a new user with valid name and email', () => {
    let user = new User('John Doe', 'john.doe@example.com');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
  });

  it('should return true for a valid name', () => {
    let user = new User('John Doe', 'john.doe@example.com');
    expect(user.isValidName()).toBe(true);
  });

  it('should return false for an empty name', () => {
    let user = new User('', 'john.doe@example.com');
    expect(user.isValidName()).toBe(false);
  });

  it('should return false for a null name', () => {
    let user = new User(null, 'john.doe@example.com');
    expect(user.isValidName()).toBe(false);
  });

  it('should return true for a valid email', () => {
    let user = new User('John Doe', 'john.doe@example.com');
    expect(user.isValidEmail()).toBe(true);
  });
});
