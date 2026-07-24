/**
 * Payload returns a relationship either as a bare id or as a populated
 * document, depending on the query's `depth`.
 */
export function getRelationshipId(
  value: number | { id: number } | null | undefined,
): number | null {
  if (value == null) {
    return null;
  }

  return typeof value === "object" ? value.id : value;
}
