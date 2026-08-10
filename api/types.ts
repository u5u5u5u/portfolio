import type { IncomingMessage, ServerResponse } from "node:http";

export interface VercelRequest extends IncomingMessage {
  body: unknown;
  query: Record<string, string | string[]>;
}

export interface VercelResponse extends ServerResponse {
  json(body: unknown): VercelResponse;
  status(statusCode: number): VercelResponse;
}
