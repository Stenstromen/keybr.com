import { afterEach, beforeEach } from "node:test";
import { Container } from "@fastr/invert";
import { ConfigModule } from "@keybr/config/lib/module.ts";
import { removeDir } from "@sosimple/fsx";
import { ServerModule } from "../../server/module.ts";
import { ApplicationModule } from "../module.ts";

export class TestContext extends Container {
  constructor() {
    super();
    this.load(new ConfigModule());
    this.load(new ApplicationModule());
    this.load(new ServerModule());
    beforeEach(async () => {
      await removeDir(this.get("dataDir"));
    });
    afterEach(async () => {
      await removeDir(this.get("dataDir"));
    });
  }
}
