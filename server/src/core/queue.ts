import type { Dependency, PolymarketMarket } from "../types";

class DependencyQueue {
  private queue: Dependency[] = [];
  private processing = false;

  add(marketId: string, market: PolymarketMarket): Dependency {
  const q: Dependency = {
    id: crypto.randomUUID(),
    marketId,
    market,
    createdAt: Date.now(),
    status: "pending",
  };
  this.queue.push(q);
  return q;
}

  getNext(): Dependency | undefined {
    return this.queue.find((q) => q.status === "pending");
  }

  update(id: string, updates: Partial<Dependency>): void {
    const q = this.queue.find((q) => q.id === id);
    if (q) {
      Object.assign(q, updates);
    }
  }

  get(id: string): Dependency | undefined {
    return this.queue.find((q) => q.id === id);
  }

  getAll(): Dependency[] {
    return [...this.queue];
  }

  setProcessing(value: boolean): void {
    this.processing = value;
  }

  isProcessing(): boolean {
    return this.processing;
  }
}

export const dependencyQueue = new DependencyQueue();
