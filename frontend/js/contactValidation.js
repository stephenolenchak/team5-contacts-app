(function (globalScope) {
  const LIMITS = Object.freeze({
    firstName: 50,
    lastName: 50,
    email: 100,
    phone: 20,
    address: 255,
    city: 50,
    state: 50,
    zipCode: 10,
  });

  const FIELD_LABELS = Object.freeze({
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'Zip code',
  });

  const asTrimmedString = (value) =>
    typeof value === 'string' ? value.trim() : '';

  function validateContactPayload(payload) {
    if (!payload || typeof payload !== 'object') {
      return 'Invalid contact payload.';
    }

    const firstName = asTrimmedString(payload.firstName);
    const lastName = asTrimmedString(payload.lastName);
    const email = asTrimmedString(payload.email);
    const phone = asTrimmedString(payload.phone);

    if (!firstName || !lastName || !email || !phone) {
      return 'First name, last name, email, and phone are required.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address.';
    }

    for (const [field, max] of Object.entries(LIMITS)) {
      const value = asTrimmedString(payload[field]);
      if (value.length > max) {
        return `${FIELD_LABELS[field]} must be ${max} characters or fewer.`;
      }
    }

    return null;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateContactPayload };
  }

  globalScope.validateContactPayload = validateContactPayload;
})(typeof window !== 'undefined' ? window : globalThis);
