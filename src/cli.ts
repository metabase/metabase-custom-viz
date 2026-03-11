#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("metabase-custom-viz")
  .description("CLI for creating custom visualizations for Metabase")
  .version("0.0.1");

program
  .command("generate")
  .description("Generate a new custom visualization scaffold")
  .argument("<name>", "Name of the custom visualization")
  .action((name: string) => {
    console.log(`Generating custom visualization: ${name}`);
    // TODO: implement scaffolding
  });

program
  .command("bundle")
  .description("Bundle the custom visualization for deployment")
  .action(() => {
    console.log("Bundling custom visualization...");
    // TODO: implement bundling
  });

program.parse();
