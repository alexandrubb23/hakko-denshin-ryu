import { type KyuLevel } from "@api/kyuProgram";
import { type StudentRankEntry } from "@api/students";
import { Belt } from "@hakko/core";
import { useKyuProgram } from "@features/public/kyu-program/useKyuProgram";

/**
 * Returns the next KyuLevel that the student should target based on their
 * current rank, or `undefined` when no next kyu level exists (e.g. student
 * already holds 1st kyu or a dan rank).
 *
 * Belt-matching rules:
 *  - White belt (6 Kyu, pre-kyu) → first kyu level (5th kyu / yellow)
 *  - Yellow–Brown belt           → next entry in the kyu program array
 *  - Black belt (dan rank)       → undefined (outside kyu program)
 */
export const useNextKyuLevel = (
  latestRank: StudentRankEntry | undefined,
): KyuLevel | undefined => {
  const { data: kyuLevels } = useKyuProgram();

  if (!kyuLevels || kyuLevels.length === 0) return undefined;
  if (!latestRank) return kyuLevels[0];

  const idx = kyuLevels.findIndex((l) => l.belt === latestRank.rank.belt);

  if (idx === -1) {
    // Belt not in the kyu program: white = pre-kyu rank → show first level;
    // anything else (e.g. dan ranks) → nothing to show.
    return latestRank.rank.belt === Belt.white ? kyuLevels[0] : undefined;
  }

  if (idx >= kyuLevels.length - 1) return undefined;

  return kyuLevels[idx + 1];
};
