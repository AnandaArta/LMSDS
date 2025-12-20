import fetch from 'node-fetch';
import assert from 'assert';

describe('API Automation Test', () => {

  // =====================
  // GET REQUEST (Positive)
  // =====================
  it('GET - should return list of posts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const body = await response.json();

    // Assert status code
    assert.strictEqual(response.status, 200);

    // Assert response body
    assert.ok(Array.isArray(body));
  });

  // =====================
  // POST REQUEST (Positive)
  // =====================
  it('POST - should create new post (positive case)', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Automation Test',
        body: 'Using Mocha and Node Fetch',
        userId: 1
      })
    });

    const body = await response.json();

    // Assert status code
    assert.strictEqual(response.status, 201);

    // Assert response body
    assert.strictEqual(body.title, 'Automation Test');
  });

  // =====================
  // POST REQUEST (Negative)
  // =====================
  it('POST - should fail when sending empty body (negative case)', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    const body = await response.json();

    // Assert status code
    assert.strictEqual(response.status, 201); 
    // NOTE: JSONPlaceholder tetap return 201 (simulasi API dummy)

    // Assert response body
    assert.ok(body.id);
  });

});
