/**
 * @category Types
 * @typeParam Key The type of the map's keys.
 * @typeParam Projection The type returned by `projection`.
 */
export type MapUniqueKeysProjection<Key, Projection> = (item: Key) => Projection
