/**
 * Collection of general utility functions
 */

/**
 * Checks if 2 objects have the same data.
 * @param {object} obj1 
 * @param {object} obj2 
 * @returns boolean
 */
export function haveSameData(obj1, obj2) {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
        return Object.keys(obj1).every(
            key => obj2.hasOwnProperty(key)
                && obj2[key] === obj1[key]);
    }
    return false;
}