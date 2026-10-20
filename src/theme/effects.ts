import type { ViewStyle } from 'react-native';
import { palette } from './colors';

export const borders = { none: 0, thin: 1 } as const;
export const opacity = { disabled: 0.5, pressed: 0.8 } as const;

// iOS uses shadow*; Android uses elevation. Validate appearance on each platform.
export const shadows = {
  none: {
    shadowColor: palette.neutral['900'],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  card: {
    shadowColor: palette.neutral['900'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
} satisfies Record<string, ViewStyle>;
