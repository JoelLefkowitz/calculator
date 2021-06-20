import { steps } from "./iterators";

export type StepFoldingContext = { accumulated: any[]; newSteps: any[] };
export type SkippingAccumulator = { output: any[]; skip: number };

export const foldSteps = (
  arr: any[],
  stepWidth: number,
  condition: (x: StepFoldingContext) => boolean,
  replacement: (x: StepFoldingContext) => any,
  skip?: (x: StepFoldingContext) => number
): any[] =>
  steps(arr, stepWidth, true).reduce(
    (acc: SkippingAccumulator, newSteps: any[]) =>
      acc.skip > 0
        ? { output: acc.output, skip: acc.skip - 1 }
        : condition({
            accumulated: acc.output,
            newSteps,
          })
        ? {
            output: acc.output.concat(
              replacement({
                accumulated: acc.output,
                newSteps,
              })
            ),
            skip: skip
              ? skip({
                  accumulated: acc.output,
                  newSteps,
                })
              : 0,
          }
        : { output: acc.output.concat(newSteps[0]), skip: 0 },
    {
      output: [],
      skip: 0,
    }
  ).output;
