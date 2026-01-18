// Arize Phoenix Observability - OpenAI auto-instrumentation, custom spans, evaluation hooks

import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION
} from '@opentelemetry/semantic-conventions';
import { OpenAIInstrumentation } from '@arizeai/openinference-instrumentation-openai';
import { trace, SpanStatusCode, Span } from '@opentelemetry/api';
import {
  SemanticConventions,
} from '@arizeai/openinference-semantic-conventions';

// Phoenix endpoint - supports both PHOENIX_ENDPOINT and COLLECTOR_ENDPOINT (from compose.yaml)
const PHOENIX_ENDPOINT = process.env.PHOENIX_ENDPOINT
  || process.env.COLLECTOR_ENDPOINT
  || 'http://localhost:6006/v1/traces';

let sdk: NodeSDK | null = null;
let isInitialized = false;

// Must be called before any OpenAI imports
export function initializeTracing(): boolean {
  if (isInitialized) {
    console.log('Phoenix tracing already initialized');
    return true;
  }

  try {
    const exporter = new OTLPTraceExporter({
      url: PHOENIX_ENDPOINT,
      headers: process.env.PHOENIX_API_KEY
        ? { 'api-key': process.env.PHOENIX_API_KEY }
        : undefined,
    });

    sdk = new NodeSDK({
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'polyindex-agent',
        [ATTR_SERVICE_VERSION]: '1.0.0',
        'deployment.environment': process.env.NODE_ENV || 'development',
      }),
      traceExporter: exporter,
      instrumentations: [new OpenAIInstrumentation()],
    });

    sdk.start();
    isInitialized = true;

    console.log(`✓ Phoenix tracing initialized → ${PHOENIX_ENDPOINT}`);
    return true;
  } catch (error) {
    console.error('Failed to initialize Phoenix tracing:', error);
    return false;
  }
}

export async function shutdownTracing(): Promise<void> {
  if (sdk) {
    await sdk.shutdown();
    console.log('Phoenix tracing shutdown complete');
  }
}

const getTracer = () => trace.getTracer('polyindex-agent', '1.0.0');

export async function withSpan<T>(
  name: string,
  attributes: Record<string, string | number | boolean>,
  fn: (span: Span) => Promise<T>
): Promise<T> {
  const tracer = getTracer();

  return tracer.startActiveSpan(name, async (span) => {
    try {
      // Set initial attributes
      for (const [key, value] of Object.entries(attributes)) {
        span.setAttribute(key, value);
      }

      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end();
    }
  });
}

export async function traceRelatedBetsJob<T>(
  jobId: string,
  sourceMarketId: string,
  eventSlug: string | undefined,
  fn: (span: Span) => Promise<T>
): Promise<T> {
  return withSpan('related_bets_job', {
    'job.id': jobId,
    'job.type': 'related_bets',
    'market.source_id': sourceMarketId,
    'market.event_slug': eventSlug || 'none',
    [SemanticConventions.SESSION_ID]: jobId,
  }, fn);
}

export async function traceBatchAnalysis<T>(
  jobId: string,
  batchIndex: number,
  batchSize: number,
  fn: (span: Span) => Promise<T>
): Promise<T> {
  return withSpan('batch_analysis', {
    'job.id': jobId,
    'batch.index': batchIndex,
    'batch.size': batchSize,
    [SemanticConventions.SESSION_ID]: jobId,
  }, fn);
}

export function recordFoundRelationship(
  span: Span,
  marketId: string,
  relationship: string,
  reasoning: string
): void {
  span.addEvent('relationship_found', {
    'relationship.market_id': marketId,
    'relationship.type': relationship,
    'relationship.reasoning': reasoning,
  });
}

export function recordEvaluation(
  span: Span,
  evalName: string,
  score: number,
  label?: string,
  explanation?: string
): void {
  span.addEvent('evaluation', {
    'eval.name': evalName,
    'eval.score': score,
    'eval.label': label || '',
    'eval.explanation': explanation || '',
  });
}

export function setLLMAttributes(
  span: Span,
  attrs: {
    model?: string;
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    temperature?: number;
  }
): void {
  if (attrs.model) span.setAttribute(SemanticConventions.LLM_MODEL_NAME, attrs.model);
  if (attrs.promptTokens) span.setAttribute(SemanticConventions.LLM_TOKEN_COUNT_PROMPT, attrs.promptTokens);
  if (attrs.completionTokens) span.setAttribute(SemanticConventions.LLM_TOKEN_COUNT_COMPLETION, attrs.completionTokens);
  if (attrs.totalTokens) span.setAttribute(SemanticConventions.LLM_TOKEN_COUNT_TOTAL, attrs.totalTokens);
}

export interface DatasetEntry {
  input: {
    sourceMarket: {
      question: string;
      description: string;
    };
    candidateMarkets: Array<{
      id: string;
      question: string;
      description: string;
    }>;
  };
  output: {
    relationships: Array<{
      marketId: string;
      relationship: string;
      reasoning: string;
    }>;
  };
  metadata: {
    jobId: string;
    timestamp: number;
    batchIndex: number;
  };
}

const collectedDataset: DatasetEntry[] = [];

export function collectDatasetEntry(entry: DatasetEntry): void {
  collectedDataset.push(entry);
  console.log(`[Phoenix Dataset] Collected entry for job ${entry.metadata.jobId}, batch ${entry.metadata.batchIndex}`);
}

export function getCollectedDataset(): DatasetEntry[] {
  return [...collectedDataset];
}

export function clearCollectedDataset(): void {
  collectedDataset.length = 0;
}

export async function exportDatasetToPhoenix(
  datasetName: string,
  entries: DatasetEntry[]
): Promise<void> {
  try {
    const { createOrGetDataset, appendDatasetExamples } = await import('@arizeai/phoenix-client/datasets');

    const { datasetId } = await createOrGetDataset({
      name: datasetName,
      description: 'Related bets analysis examples for evaluation and fine-tuning',
      examples: [],
    });
    console.log(`[Phoenix] Using dataset: ${datasetName} (${datasetId})`);

    const examples = entries.map(entry => ({
      input: entry.input,
      output: entry.output,
      metadata: entry.metadata,
    }));

    await appendDatasetExamples({
      dataset: { datasetId },
      examples,
    });

    console.log(`[Phoenix] Exported ${entries.length} entries to dataset: ${datasetName}`);
  } catch (error) {
    console.error('[Phoenix] Failed to export dataset:', error);
  }
}

export interface EvalResult {
  name: string;
  score: number;
  label: 'pass' | 'fail' | 'unknown';
  explanation: string;
}

export function evalValidRelationship(relationship: string): EvalResult {
  const validTypes = ['IMPLIES', 'CONTRADICTS', 'PARTITION_OF', 'SUBEVENT', 'CONDITIONED_ON', 'WEAK_SIGNAL'];
  const isValid = validTypes.includes(relationship);

  return {
    name: 'valid_relationship_type',
    score: isValid ? 1 : 0,
    label: isValid ? 'pass' : 'fail',
    explanation: isValid
      ? `Valid relationship type: ${relationship}`
      : `Invalid relationship type: ${relationship}`,
  };
}

export function evalReasoningQuality(reasoning: string): EvalResult {
  const minLength = 20;
  const hasSubstance = reasoning.length >= minLength &&
    !reasoning.toLowerCase().includes('related market') &&
    !reasoning.toLowerCase().includes('similar');

  const score = hasSubstance ? 1 : Math.min(reasoning.length / minLength, 1);

  return {
    name: 'reasoning_quality',
    score,
    label: score >= 0.7 ? 'pass' : 'fail',
    explanation: hasSubstance
      ? 'Reasoning provides specific explanation'
      : 'Reasoning is too generic or short',
  };
}

export function evaluateRelationship(
  relationship: string,
  reasoning: string
): EvalResult[] {
  return [
    evalValidRelationship(relationship),
    evalReasoningQuality(reasoning),
  ];
}
