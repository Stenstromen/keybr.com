#!/usr/bin/env -S npx tsnode

import { Container } from "@fastr/invert";
import { makeKnex } from "@keybr/config";
import { Env } from "@keybr/config/lib/env.ts";
import { ConfigModule } from "@keybr/config/lib/module.ts";
import { createSchema, UserLoginRequest } from "@keybr/database";
import { Logger } from "@keybr/logger";

const email = "user@localhost";
const accessToken = "xyz";

Env.probeFilesSync();
const container = new Container();
container.load(new ConfigModule());
const knex = makeKnex();

async function exec() {
  try {
    await createSchema(knex);
    Logger.info(`Database schema was created.`);
    await UserLoginRequest.query().delete().where({ email });
    await UserLoginRequest.query().insert({ email, accessToken });
    const loginLink = new URL(
      `/login/${accessToken}`,
      container.get("canonicalUrl"),
    );
    Logger.info(`Access token '${accessToken}' was created.`);
    Logger.info(`Visit ${loginLink} to login with an example account.`);
  } finally {
    await knex.destroy();
  }
}

exec().catch((err) => {
  console.error(err);
});
