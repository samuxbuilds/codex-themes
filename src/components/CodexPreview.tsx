/**
 * Codex UI preview components. Renders a miniature Codex-style chat interface
 * (title bar, sidebar, messages, diff block, input) to preview themes visually.
 */

import { CodexTheme } from "../lib/types";

function adjustBrightness(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function mixColor(c1: string, c2: string, ratio: number): string {
  const n1 = parseInt(c1.replace("#", ""), 16);
  const n2 = parseInt(c2.replace("#", ""), 16);
  const r = Math.round(((n1 >> 16) & 0xff) * (1 - ratio) + ((n2 >> 16) & 0xff) * ratio);
  const g = Math.round(((n1 >> 8) & 0xff) * (1 - ratio) + ((n2 >> 8) & 0xff) * ratio);
  const b = Math.round((n1 & 0xff) * (1 - ratio) + (n2 & 0xff) * ratio);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/**
 * Full Codex preview: title bar, sidebar, chat messages with diff block, and input bar.
 * @param props.theme - Theme to render
 */
export default function CodexPreview({ theme }: { theme: CodexTheme }) {
  const { surface, ink, accent } = theme.theme;
  const { diffAdded, diffRemoved } = theme.theme.semanticColors;
  const isDark = theme.variant === "dark";

  const sidebar = isDark
    ? adjustBrightness(surface, 8)
    : adjustBrightness(surface, -8);
  const surfaceEl = isDark
    ? adjustBrightness(surface, 16)
    : adjustBrightness(surface, -4);
  const muted = mixColor(ink, surface, 0.55);
  const borderColor = isDark
    ? adjustBrightness(surface, 24)
    : adjustBrightness(surface, -16);

  return (
    <div
      className="rounded-xl overflow-hidden border text-[10px] leading-[1.5] select-none"
      style={{
        background: surface,
        borderColor,
        color: ink,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ background: sidebar, borderBottom: `1px solid ${borderColor}` }}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <span className="ml-auto text-[9px] font-medium" style={{ color: muted }}>
          Codex
        </span>
      </div>

      <div className="flex" style={{ height: 140 }}>
        {/* Sidebar */}
        <div
          className="flex flex-col gap-1.5 px-2 py-2 shrink-0"
          style={{
            width: 54,
            background: sidebar,
            borderRight: `1px solid ${borderColor}`,
          }}
        >
          {[accent, muted, muted, muted].map((c, i) => (
            <div
              key={i}
              className="rounded"
              style={{
                height: 6,
                width: i === 0 ? "100%" : `${65 + i * 8}%`,
                background: i === 0 ? `${accent}30` : `${c}18`,
                borderLeft: i === 0 ? `2px solid ${accent}` : "none",
              }}
            />
          ))}
          <div className="mt-auto">
            <div
              className="w-4 h-4 rounded-full mx-auto"
              style={{ background: `${accent}25`, border: `1px solid ${accent}50` }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat messages */}
          <div className="flex-1 px-3 py-2 flex flex-col gap-2 overflow-hidden">
            {/* User message */}
            <div className="flex gap-1.5 items-start">
              <div
                className="w-4 h-4 rounded-full shrink-0 mt-0.5"
                style={{ background: `${accent}30` }}
              />
              <div>
                <span className="font-semibold text-[9px]" style={{ color: accent }}>
                  You
                </span>
                <div
                  className="mt-0.5 rounded-md px-2 py-1"
                  style={{ background: surfaceEl }}
                >
                  <div style={{ color: ink }} className="text-[9px]">
                    Refactor auth module
                  </div>
                </div>
              </div>
            </div>

            {/* Assistant message */}
            <div className="flex gap-1.5 items-start">
              <div
                className="w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-[7px] font-bold"
                style={{ background: accent, color: surface }}
              >
                C
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-[9px]" style={{ color: muted }}>
                  Codex
                </span>
                {/* Inline code block */}
                <div
                  className="mt-0.5 rounded-md overflow-hidden"
                  style={{ border: `1px solid ${borderColor}` }}
                >
                  <div
                    className="px-2 py-0.5 flex items-center justify-between"
                    style={{
                      background: isDark ? adjustBrightness(surface, 12) : adjustBrightness(surface, -8),
                      borderBottom: `1px solid ${borderColor}`,
                    }}
                  >
                    <span className="text-[8px]" style={{ color: muted }}>auth.ts</span>
                    <span className="text-[8px]" style={{ color: accent }}>diff</span>
                  </div>
                  <div className="px-2 py-1 font-mono text-[8px] leading-[1.6]" style={{ background: surfaceEl }}>
                    <div style={{ color: diffRemoved }}>
                      <span style={{ color: `${diffRemoved}88` }}>- </span>
                      const token = legacy();
                    </div>
                    <div style={{ color: diffAdded }}>
                      <span style={{ color: `${diffAdded}88` }}>+ </span>
                      const token = jwt.sign();
                    </div>
                    <div style={{ color: muted }}>
                      &nbsp; return validate(token);
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div
            className="px-3 py-1.5 flex items-center gap-2"
            style={{
              borderTop: `1px solid ${borderColor}`,
              background: sidebar,
            }}
          >
            <div
              className="flex-1 rounded-md px-2 py-1 text-[9px]"
              style={{
                background: surfaceEl,
                color: muted,
                border: `1px solid ${borderColor}`,
              }}
            >
              Ask Codex…
            </div>
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center text-[9px]"
              style={{ background: accent, color: surface }}
            >
              ↑
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact preview for grid cards: minimal title bar, sidebar, and diff snippet.
 * @param props.theme - Theme to render
 */
export function CodexPreviewMini({ theme }: { theme: CodexTheme }) {
  const { surface, ink, accent } = theme.theme;
  const isDark = theme.variant === "dark";
  const sidebar = isDark ? adjustBrightness(surface, 8) : adjustBrightness(surface, -8);
  const borderColor = isDark ? adjustBrightness(surface, 24) : adjustBrightness(surface, -16);
  const surfaceEl = isDark ? adjustBrightness(surface, 16) : adjustBrightness(surface, -4);
  const muted = mixColor(ink, surface, 0.55);

  return (
    <div
      className="rounded-lg overflow-hidden border"
      style={{ background: surface, borderColor, height: "100%" }}
    >
      <div
        className="flex items-center gap-1 px-2 py-1"
        style={{ background: sidebar, borderBottom: `1px solid ${borderColor}` }}
      >
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#28c840" }} />
        </div>
      </div>
      <div className="flex" style={{ height: "calc(100% - 20px)" }}>
        <div
          className="shrink-0"
          style={{
            width: 28,
            background: sidebar,
            borderRight: `1px solid ${borderColor}`,
          }}
        >
          <div className="p-1.5 flex flex-col gap-1">
            {[true, false, false].map((active, i) => (
              <div
                key={i}
                className="rounded"
                style={{
                  height: 3,
                  width: active ? "100%" : "70%",
                  background: active ? `${accent}40` : `${muted}20`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 p-1.5 flex flex-col gap-1.5 overflow-hidden">
          <div className="flex gap-1 items-center">
            <div
              className="w-2.5 h-2.5 rounded-full flex items-center justify-center"
              style={{ background: accent, color: surface, fontSize: 5, fontWeight: 700 }}
            >
              C
            </div>
            <div style={{ height: 3, width: "60%", background: `${muted}30`, borderRadius: 2 }} />
          </div>
          <div
            className="rounded"
            style={{
              height: 16,
              background: surfaceEl,
              border: `1px solid ${borderColor}`,
            }}
          >
            <div className="p-1 font-mono" style={{ fontSize: 4, lineHeight: 1.6 }}>
              <div style={{ color: theme.theme.semanticColors.diffAdded }}>+ jwt.sign()</div>
              <div style={{ color: theme.theme.semanticColors.diffRemoved }}>- legacy()</div>
            </div>
          </div>
          <div className="mt-auto flex gap-1">
            <div
              className="flex-1 rounded"
              style={{
                height: 8,
                background: surfaceEl,
                border: `1px solid ${borderColor}`,
              }}
            />
            <div
              className="rounded flex items-center justify-center"
              style={{ width: 8, height: 8, background: accent, color: surface, fontSize: 5 }}
            >
              ↑
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
