import { createServer } from "node:http";
import { after } from "node:test";
import { type BuildableRequest, request } from "@fastr/client";
import { cookies, start } from "@fastr/client-testlib";
import { type Application } from "@fastr/core";

export type TestRequest = BuildableRequest;

export function startApp(app: Application): TestRequest {
  return request.use(start(createTestServer(app.callback()))).use(cookies());
}

export function createTestServer(callback: any) {
  const server = createServer(callback);
  after(() => {
    server.close();
  });
  return server;
}
