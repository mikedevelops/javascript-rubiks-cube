/**
 * Get random whole number in range (inclusive)
 * @param  {number} min
 * @param  {nimber} max
 * @return {number}
 */
export function randomRange (min, max) {
    console.log(min, max)
    return Math.floor(Math.random() * (max - min)) + min;
}
