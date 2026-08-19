import { Application } from "@fastr/core";
import { Container } from "@fastr/invert";
import { Manifest } from "@keybr/assets";
import { Env } from "@keybr/config/lib/env.ts";
import { ConfigModule } from "@keybr/config/lib/module.ts";
import { Logger } from "@keybr/logger";
import { ApplicationModule, kMain } from "./app/index.ts";
import { ServerModule } from "./server/module.ts";
import { Service } from "./server/service.ts";

initErrorHandlers();
Env.probeFilesSync();
const container = makeContainer();
Logger.info("Configuration", {
  dataDir: container.get("dataDir"),
  publicDir: container.get("publicDir"),
  canonicalUrl: container.get("canonicalUrl"),
});
process.title = "keybr";
container.get(Service).start({
  app: container.get(Application, kMain),
  port: Env.getPort("SERVER_PORT", 3000),
});

function makeContainer() {
  const container = new Container();
  container.load(new ConfigModule());
  container.load(new ApplicationModule());
  container.load(new ServerModule());
  container.get(Manifest); // Sanity check.
  return container;
}

function initErrorHandlers() {
  process.on("warning", (warning) => {
    Logger.warn("Warning", warning);
  });
  process.on("multipleResolves", (type, promise, reason) => {
    Logger.error("Multiple resolvers", { type, promise, reason });
    process.exit(1);
  });
  process.on("uncaughtException", (error) => {
    Logger.error("Uncaught exception", error);
    process.exit(1);
  });
  process.on("unhandledRejection", (reason) => {
    Logger.error("Unhandled rejection", reason);
    process.exit(1);
  });
}
