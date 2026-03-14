/**
 * Theme customizer panel. Live-edits accent, surface, ink, fonts, contrast,
 * semantic colors, and variant; outputs copyable config string for Codex import.
 */

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { CodexTheme, CodexThemeConfig } from "../lib/types";
import { encodeThemeConfig } from "../lib/theme-generator";
import CodexPreview from "./CodexPreview";

interface Props {
  baseTheme: CodexTheme;
  onClose: () => void;
}

/**
 * Side panel for customizing a theme. Shows live preview, color pickers,
 * variant toggle, contrast slider, and copy-to-clipboard for config string.
 * @param props.baseTheme - Theme to customize (used as starting point)
 * @param props.onClose - Called when user closes the panel
 */
export default function ThemeEditor({ baseTheme, onClose }: Props) {
  const [config, setConfig] = useState<CodexThemeConfig>({ ...baseTheme.theme });
  const [variant, setVariant] = useState(baseTheme.variant);
  const [uiFont, setUiFont] = useState(baseTheme.theme.fonts.ui || "");
  const [codeFont, setCodeFont] = useState(baseTheme.theme.fonts.code || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setConfig({ ...baseTheme.theme });
    setVariant(baseTheme.variant);
    setUiFont(baseTheme.theme.fonts.ui || "");
    setCodeFont(baseTheme.theme.fonts.code || "");
  }, [baseTheme]);

  const update = useCallback(
    (patch: Partial<CodexThemeConfig>) => {
      setConfig((c) => ({ ...c, ...patch }));
    },
    []
  );

  const updateSemantic = useCallback(
    (key: keyof CodexThemeConfig["semanticColors"], value: string) => {
      setConfig((c) => ({
        ...c,
        semanticColors: { ...c.semanticColors, [key]: value },
      }));
    },
    []
  );

  const reset = () => {
    setConfig({ ...baseTheme.theme });
    setVariant(baseTheme.variant);
    setUiFont(baseTheme.theme.fonts.ui || "");
    setCodeFont(baseTheme.theme.fonts.code || "");
  };

  const editedTheme: CodexTheme = {
    ...baseTheme,
    variant,
    theme: {
      ...config,
      fonts: {
        ui: uiFont || null,
        code: codeFont || null,
      },
    },
  };

  const configString = encodeThemeConfig(editedTheme);

  const copyConfig = () => {
    navigator.clipboard.writeText(configString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full md:w-[400px] animate-slide-right flex flex-col h-full">
      <div
        className="flex items-center justify-between px-4 py-3 border-b sticky top-0 z-10"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ background: config.accent }} />
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Customize: {baseTheme.name}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={reset}
            className="p-1 rounded-md"
            style={{ background: "var(--surface-2)" }}
            title="Reset to original"
          >
            <RotateCcw className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[11px] px-2"
            style={{ background: "var(--surface-2)", color: "var(--muted)" }}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Live preview */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Live Preview</p>
          <CodexPreview theme={editedTheme} />
        </div>

        {/* Variant toggle */}
        <div>
          <Label>Variant</Label>
          <div
            className="flex rounded-lg border overflow-hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {(["light", "dark"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className="flex-1 py-1.5 text-xs font-medium capitalize transition-colors"
                style={{
                  background: variant === v ? "var(--accent-dim)" : "var(--background)",
                  color: variant === v ? "var(--accent)" : "var(--muted)",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Color fields */}
        <ColorField
          label="Accent"
          value={config.accent}
          onChange={(v) => update({ accent: v })}
        />
        <ColorField
          label="Background"
          value={config.surface}
          onChange={(v) => update({ surface: v })}
        />
        <ColorField
          label="Foreground"
          value={config.ink}
          onChange={(v) => update({ ink: v })}
        />

        {/* Fonts */}
        <div>
          <Label>UI Font</Label>
          <input
            type="text"
            value={uiFont}
            onChange={(e) => setUiFont(e.target.value)}
            placeholder="-apple-system, BlinkMacSystemFont"
            className="w-full rounded-lg border px-3 py-1.5 text-xs bg-transparent outline-none"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              background: "var(--background)",
            }}
          />
        </div>

        <div>
          <Label>Code Font</Label>
          <input
            type="text"
            value={codeFont}
            onChange={(e) => setCodeFont(e.target.value)}
            placeholder='ui-monospace, "SFMono-Regular"'
            className="w-full rounded-lg border px-3 py-1.5 text-xs bg-transparent outline-none"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              background: "var(--background)",
            }}
          />
        </div>

        {/* Translucent sidebar */}
        <div className="flex items-center justify-between">
          <Label noMargin>Translucent sidebar</Label>
          <button
            onClick={() => update({ opaqueWindows: !config.opaqueWindows })}
            className="w-9 h-5 rounded-full relative transition-colors"
            style={{
              background: !config.opaqueWindows ? config.accent : "var(--surface-3)",
            }}
          >
            <div
              className="w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all"
              style={{ left: !config.opaqueWindows ? 18 : 3 }}
            />
          </button>
        </div>

        {/* Contrast slider */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label noMargin>Contrast</Label>
            <span className="text-xs tabular-nums font-mono" style={{ color: "var(--foreground)" }}>
              {config.contrast}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={config.contrast}
            onChange={(e) => update({ contrast: parseInt(e.target.value) })}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${config.accent} ${config.contrast}%, var(--surface-3) ${config.contrast}%)`,
            }}
          />
        </div>

        {/* Semantic colors */}
        <div>
          <Label>Semantic Colors</Label>
          <div className="flex flex-col gap-2">
            <ColorField
              label="Diff Added"
              value={config.semanticColors.diffAdded}
              onChange={(v) => updateSemantic("diffAdded", v)}
              compact
            />
            <ColorField
              label="Diff Removed"
              value={config.semanticColors.diffRemoved}
              onChange={(v) => updateSemantic("diffRemoved", v)}
              compact
            />
            <ColorField
              label="Skill"
              value={config.semanticColors.skill}
              onChange={(v) => updateSemantic("skill", v)}
              compact
            />
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={copyConfig}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: copied ? "#22c55e" : config.accent,
            color: variant === "light" && !copied ? "#ffffff" : config.surface,
          }}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy Custom Config
            </>
          )}
        </button>

        {/* Config string */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label noMargin>Config String</Label>
            <button
              onClick={copyConfig}
              className="text-[10px] flex items-center gap-1"
              style={{ color: "var(--accent)" }}
            >
              <Copy className="w-2.5 h-2.5" /> Copy
            </button>
          </div>
          <div
            className="rounded-lg p-3 font-mono text-[10px] leading-relaxed border overflow-x-auto"
            style={{
              background: "var(--background)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
              whiteSpace: "pre",
            }}
          >
            <span style={{ color: "var(--accent)" }}>codex-theme-v1:</span>{`\n`}{JSON.stringify(
              { codeThemeId: editedTheme.codeThemeId, theme: editedTheme.theme, variant },
              null,
              2
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) {
  return (
    <p
      className={`text-[10px] font-semibold uppercase tracking-wider ${noMargin ? "" : "mb-1.5"}`}
      style={{ color: "var(--muted)" }}
    >
      {children}
    </p>
  );
}

function ColorField({
  label,
  value,
  onChange,
  compact,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex items-center gap-2" : ""}>
      {!compact && <Label>{label}</Label>}
      <div
        className="flex items-center gap-2 rounded-lg border px-2 py-1"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-6 rounded border-none cursor-pointer"
          style={{ background: "transparent" }}
        />
        {compact && (
          <span className="text-[10px] w-14" style={{ color: "var(--muted)" }}>
            {label}
          </span>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
          }}
          className="flex-1 bg-transparent text-xs font-mono outline-none"
          style={{ color: "var(--foreground)" }}
        />
      </div>
    </div>
  );
}
