"use client";

import { useEffect, useState } from "react";
import {
  fetchAccountDashboard,
  type AccountDashboardData,
} from "@/lib/supabase/queries/account";

const EMPTY: AccountDashboardData = {
  profile: null,
  ordersTotal: 0,
  addressesCount: 0,
  reviewsCount: 0,
  recentOrders: [],
  addresses: [],
};

export function useAccountDashboard(userId: string | undefined, ready: boolean) {
  const [data, setData] = useState<AccountDashboardData>(EMPTY);
  const [loading, setLoading] = useState(Boolean(userId));

  useEffect(() => {
    if (!ready) return;

    if (!userId) {
      setData(EMPTY);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = () => {
      setLoading(true);
      void fetchAccountDashboard(userId)
        .then((next) => {
          if (!cancelled) setData(next);
        })
        .catch((error) => {
          console.error("[account] dashboard fetch failed:", error);
          if (!cancelled) setData(EMPTY);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    load();

    const onFocus = () => load();
    window.addEventListener("focus", onFocus);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
    };
  }, [userId, ready]);

  return { data, loading };
}
