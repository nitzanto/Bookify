describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'nitzan16001@gmail.com',
      password: 'StrongPassword123!@',
    };

    // Creating the user
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    jwt = await response.text();
  });

  test('Create', async () => {
    const response = await fetch('http://reservations:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({
        startDate: '02-01-2021',
        endDate: '02-01-2023',
        charge: {
          amount: 199,
          card: {
            cvc: '413',
            exp_month: 12,
            exp_year: 2027,
            number: '4242 4242 4242 4242',
          },
        },
      }),
    });
    expect(response.ok).toBeTruthy();
    const reservations = await response.json();
  });
});
