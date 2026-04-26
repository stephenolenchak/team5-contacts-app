const { validateContactPayload } = require('../../frontend/js/contactValidation');

describe('validateContactPayload', () => {
  const validPayload = {
    firstName: 'Taylor',
    lastName: 'Smith',
    email: 'taylor@example.com',
    phone: '407-555-0101',
    address: '123 Main St',
    city: 'Orlando',
    state: 'FL',
    zipCode: '32801',
    notes: 'Met at conference',
  };

  test('returns null for a valid payload', () => {
    expect(validateContactPayload(validPayload)).toBeNull();
  });

  test('returns required fields error when a required field is missing', () => {
    const missingFirstName = { ...validPayload, firstName: '   ' };

    expect(validateContactPayload(missingFirstName)).toBe(
      'First name, last name, email, and phone are required.'
    );
  });

  test('returns email validation error for invalid email format', () => {
    const invalidEmail = { ...validPayload, email: 'not-an-email' };

    expect(validateContactPayload(invalidEmail)).toBe(
      'Please enter a valid email address.'
    );
  });

  test('returns max-length error when a field exceeds allowed length', () => {
    const longPhone = { ...validPayload, phone: '1'.repeat(21) };

    expect(validateContactPayload(longPhone)).toBe(
      'Phone must be 20 characters or fewer.'
    );
  });
});
