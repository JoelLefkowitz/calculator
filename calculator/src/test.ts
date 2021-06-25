declare var require: NodeRequire;

const resolve = (context: any) => context.keys().forEach(context);

resolve(require.context(".", true, /.spec.ts$/));
resolve(require.context(".", true, /(?<!main|spec).ts$/));
