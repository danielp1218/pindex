import { priceRelations } from '@polyindex/relations-engine';
import type {
  PricingOptions,
  PricingResult,
  RelationInput,
} from '@polyindex/relations-engine';

export function priceRelationSet(
  relations: RelationInput[],
  options?: PricingOptions
): PricingResult {
  return priceRelations(relations, options);
}
