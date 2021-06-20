import { StepFoldingContext, foldSteps } from "./folds";

import { joinDigits } from "./numbers";
import { parametrize } from "../tests/runners";

describe("foldSections", () =>
  parametrize(
    foldSteps,
    [
      {
        inputs: [
          [1, 2, 3, 4],
          2,
          ({ accumulated: _, newSteps: [i, j] }: StepFoldingContext) =>
            i + j == 5,
          ({ accumulated: _, newSteps: [i, j] }: StepFoldingContext) =>
            joinDigits(i, j),
          (_: StepFoldingContext) => 1,
        ],
        expected: [1, 23, 4],
      },
    ],
    {
      deep: true,
    }
  ));
