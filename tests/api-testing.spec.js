 import { test, expect } from '@playwright/test';

const REPO = 'test-repo-1';
const USER = 'github-username';

// Request context is reused by all tests in the file.
let apiContext;
let bookingId;
test.describe.serial('API tests for Restful Booker', () => {
test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://restful-booker.herokuapp.com/',
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      'Authorization': `Basic YWRtaW46cGFzc3dvcmQxMjM=`,
    },
  });
});

test.afterAll(async ({ }) => {
  // Dispose all responses.
  await apiContext.dispose();
});

test('create new booking', async ({ page }) => {
  const newBooking = await apiContext.post('/booking', {
    data: {
      firstname: 'Jim',
      lastname: 'Carry',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Breakfast'
    }
  });
  expect(newBooking.ok()).toBeTruthy();
  const bookingResponse = await newBooking.json();
  console.log(bookingResponse);
    bookingId = bookingResponse.bookingid;

});

test('get specific booking', async ({ page }) => {
  const booking = await apiContext.get(`/booking/${bookingId}`)
  await expect(booking).toBeOK();
  console.log(await booking.json());
});

test('update booking', async ({ page }) => {
  const updatedBooking = await apiContext.put(`/booking/${bookingId}`, {
    data: {
      firstname: 'Aamir',
      lastname: 'Baba',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Brunch'
    }
  });
  expect(updatedBooking.ok()).toBeTruthy();
  const bookingResponse = await updatedBooking.json();
  console.log(bookingResponse);
});

test('delete booking', async ({ page }) => {
  const deleteBooking = await apiContext.delete(`/booking/${bookingId}`);
  expect(deleteBooking.ok()).toBeTruthy();
  console.log(deleteBooking)
}); 
});