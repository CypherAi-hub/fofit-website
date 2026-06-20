import { useCallback, useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";
import { deleteBodyLabGoal, getBodyLabGoals, setBodyLabGoal, type BodyLabGoals } from "./goals";

/** Loads the user's per-metric goals + set/clear. Goals are additive — failures degrade to "no
 *  goal", never blocking the rest of Body Lab. */
export function useBodyLabGoals() {
  const [goals, setGoals] = useState<BodyLabGoals>({});

  const refresh = useCallback(async () => {
    setGoals(await getBodyLabGoals(supabase));
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const setGoal = useCallback(
    async (metric: string, target: number) => {
      await setBodyLabGoal(supabase, metric, target);
      await refresh();
    },
    [refresh],
  );

  const clearGoal = useCallback(
    async (metric: string) => {
      await deleteBodyLabGoal(supabase, metric);
      await refresh();
    },
    [refresh],
  );

  return { goals, setGoal, clearGoal };
}
