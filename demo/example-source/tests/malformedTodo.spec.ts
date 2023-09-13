/** TODO: Fix test 1
 */
describe('Did not provide a @due attribute', () => {
  test('Using your own todo validator can fix this, and will not report an error', () => {
    expect(1).toBe(2)
  })
})

/** TODO: Fix test 2
 * @due never
 */
describe('@due attribute is invalid and cannot be parsed into a date', () => {
  test('Using your own todo validator can fix this, and will not report an error', () => {
    expect(1).toBe(2)
  })
})

// TODO: Fix test 3
describe("Using a single comma doesn't allow you to put a due date", () => {
  test('Using your own todo validator can fix this, and will not report an error', () => {
    expect(1).toBe(2)
  })
})
