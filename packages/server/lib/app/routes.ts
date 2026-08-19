import { allToRoutes } from "@fastr/controller";
import { type Middleware } from "@fastr/core";
import { Router } from "@fastr/middleware-router";
import { Controller as PageController } from "./page/index.ts";
import { Controller as SitemapController } from "./sitemap/index.ts";

export function mainRoutes(): Middleware<any> {
  return new Router()
    .registerAll(allToRoutes(PageController, SitemapController))
    .middleware();
}
