/** `Populatable`'s are scenes which can be `populate`d,
    which is intended to be an opposite or inverse of the `Scene` `clear` method.
    (Depending upon whether it is implemented to add actors back in their current state,
     or "reset" them to initial settings.)

    One possible use of a `populate` method is to allow for scenes to be "paused"
    by `clear`, and then unpaused by `populate`.
*/
export interface Populatable {
  /** `populate` may be called on a `Scene`. */
  populate(): void;
}

/** Type guard for `Populatable` objects */
export function isPopulatable(object: any): object is Populatable {
  return 'populate' in object;
}
