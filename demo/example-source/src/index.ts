/** TODO: Implement real auth
 * @due 2023-10-31
 * @ticket https://thescience.guy/board/123/ticket.456
 */
export const getUser = () => {
  return {
    firstName: 'Bill',
    lastName: 'Nye',
    email: 'bill.nye@thescience.guy',
  }
}

/** TODO: Enable this awesome feature that we commented out because it didn't work right and was blocking deployment
 * @due 2019-02-14
 * @ticket https://google.com
 */
const isFeatureEnabled = false

if (isFeatureEnabled) {
  console.log('Yay! The feature is enabled')
}
