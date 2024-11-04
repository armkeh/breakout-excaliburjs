/** `Restartable`s are scenes which can be `restart`ed,
    which is intended to return all actors to their initial settings
    (from the player's point of view).

    One way to restart scenes is to duplicate all actors for a scene,
    and to add the "clones" to the scene while keeping the "originals"
    ready to be duplicated again on a restart.
    Keep in mind to clear out unneeded actors if taking this approach.
*/
export interface Restartable {
  /** `restart` may be called on a `Scene`. It is intended to return all actors
      to their original settings (from the player's point of view).
   */
  restart(): void;
}

/** Type guard for `Restartable` objects */
export function isRestartable(object: any): object is Restartable {
  return 'restart' in object;
}
