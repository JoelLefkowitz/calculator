declare var require: any;

const resolve = (context: any) => context.keys().forEach(context);
 
resolve(require.context('.', true, /.spec.ts$/));
resolve(require.context('.', true, /(?<!main|spec).ts$/));
