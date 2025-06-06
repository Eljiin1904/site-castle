/**
 * All the round times for the crash game.
 * These times are used to control the flow of the game and the user interface.
 */
export const roundTimes = {
  waiting: 4000, // Time before the round starts, allow users to place bets
  pending: 100, // Time before the round starts, allow users to place bets
  completed: 4000, // Time after the round ends, process bets and show results
  delay: 1000, // Delay time between server and client, used for latency compensation
  intervalFrequency: 150, // Frequency of the interval that updates the round time in the client, and processes auto cashouts
};