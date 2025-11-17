// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { applyDensity, Density } from '@cloudscape-design/global-styles';

export interface SettingsState {
  density: Density;
  setDensity: (density: Density) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      density: Density.Comfortable,
      setDensity: (density: Density) => {
        if (get().density !== density) {
          applyDensity(density);
          set({ density });
        }
      },
    }),
    {
      name: 'Awsui-Density-Preference', // Key in localStorage
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        // Return a callback that will be called after rehydration
        return state => {
          if (state) {
            applyDensity(state.density);
          }
        };
      },
    },
  ),
);

// To ensure density is applied on initial load, we can initialize it here.
// The `onRehydrateStorage` should handle applying the persisted density.
// We can also trigger an initial application of density.
const initialDensity = useSettingsStore.getState().density;
applyDensity(initialDensity);
