import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

import { revalidateCache } from "@/shared/utils/revalidate-cache";

type Options = {
  /** Names the collection in log messages. */
  source: string;
  /**
   * The tag to invalidate, or a function of the affected document when the
   * collection also carries a per-document tag.
   */
  tag: string | ((doc: { id: number | string }) => string);
};

/**
 * Builds the cache-invalidation hooks for a collection.
 *
 * Returns `afterChange` *and* `afterDelete` together, because a collection that
 * invalidates on edit but not on delete leaves removed content served from
 * cache until the revalidate window elapses. Seven of the eight collections had
 * exactly that gap. Producing both from one call makes the pair impossible to
 * split by accident.
 *
 * `afterChange` covers create and update; `afterDelete` covers removal.
 */
export function createRevalidateHooks({ source, tag }: Options): {
  afterChange: CollectionAfterChangeHook[];
  afterDelete: CollectionAfterDeleteHook[];
} {
  const revalidate = async ({
    doc,
    req,
  }: {
    doc: { id: number | string };
    req: Parameters<CollectionAfterChangeHook>[0]["req"];
  }) => {
    await revalidateCache({
      req,
      source,
      tag: typeof tag === "function" ? tag(doc) : tag,
    });
  };

  return {
    afterChange: [revalidate as CollectionAfterChangeHook],
    afterDelete: [revalidate as CollectionAfterDeleteHook],
  };
}
