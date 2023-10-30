describe('Health', () => {
  test('Reservations', async () => {
    const res = await fetch('http://reservations:3000');
    expect(res.ok).toBeTruthy();
  });
});
