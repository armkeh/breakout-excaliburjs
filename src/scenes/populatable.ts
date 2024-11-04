/** `Populatable`s are scenes which can be `populate`d,
    which is intended to be an opposite or inverse of the `Scene` `clear` method.
    (Depending upon whether it is implemented to add actors back in their current state,
     or "reset" them to initial settings.)

    One possible use of a `populate` method is to allow for scenes to be "paused"
    by `clear`, and then unpaused by `populate`.
*/
export interface Populatable {
  /** `populate` may be called on a `Scene`. It is intended to be
      an opposite or inverse of `clear`, i.e., it should
      add all of a scenes intended actors to the scene.

      Depending upon implementation, those actors may or may not return
      in their most recent state.
  */
  populate(): void;
}

/** Type guard for `Populatable` objects */
export function isPopulatable(object: any): object is Populatable {
  return 'populate' in object;
}
