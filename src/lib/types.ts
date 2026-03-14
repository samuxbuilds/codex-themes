/**
 * Type definitions for Codex themes. Defines the structure of theme configuration
 * and metadata used across the theme gallery and customizer.
 */

/** Visual configuration for a Codex theme (colors, fonts, contrast). */
export interface CodexThemeConfig {
  accent: string;
  contrast: number;
  fonts: {
    code: string | null;
    ui: string | null;
  };
  ink: string;
  opaqueWindows: boolean;
  semanticColors: {
    diffAdded: string;
    diffRemoved: string;
    skill: string;
  };
  surface: string;
}

/** Full theme definition with metadata (id, name, category, tags) and config. */
export interface CodexTheme {
  id: string;
  name: string;
  codeThemeId: string;
  variant: "light" | "dark";
  category: string;
  tags: string[];
  theme: CodexThemeConfig;
}

/** Category metadata for filtering themes in the gallery. */
export type ThemeCategory = {
  id: string;
  name: string;
  icon: string;
  count: number;
};
