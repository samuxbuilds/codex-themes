/**
 * Main app layout: virtualized theme grid, collapsible sidebar with categories,
 * search, variant/view filters, and preview/editor panel for selected themes.
 */

 import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Search,
  Copy,
  Check,
  X,
  Sun,
  Moon,
  Palette,
  Sparkles,
  Grid3X3,
  LayoutGrid,
  ArrowUpRight,
  SlidersHorizontal,
  Share2,
  Link,
} from "lucide-react";
import { CodexTheme } from "../lib/types";
import { getAllThemes, getCategories, encodeThemeConfig } from "../lib/theme-generator";
import CodexPreview, { CodexPreviewMini } from "./CodexPreview";
import ThemeEditor from "./ThemeEditor";

type ViewMode = "grid" | "compact";
type VariantFilter = "all" | "light" | "dark";
type PanelMode = "preview" | "editor";

const GRID_COL_MIN = 220;
const COMPACT_COL_MIN = 160;
const GRID_ROW_H = 148;
const COMPACT_ROW_H = 52;
const GAP = 12;

/**
 * Main layout component. Renders sidebar (categories), toolbar (search, filters,
 * view mode), virtualized grid of theme cards, and slide-out preview/editor panel.
 */
export default function ThemeGrid() {
  const allThemes = useMemo(() => getAllThemes(), []);
  const categories = useMemo(() => getCategories(), []);

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [variantFilter, setVariantFilter] = useState<VariantFilter>("all");
  const [selectedTheme, setSelectedTheme] = useState<CodexTheme | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [panelMode, setPanelMode] = useState<PanelMode>("preview");
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Query-param routing: read ?theme= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const themeId = params.get("theme");
    if (themeId) {
      const found = allThemes.find((t) => t.id === themeId);
      if (found) setSelectedTheme(found);
    }
  }, [allThemes]);

  // Update ?theme= query param when theme selection changes
  const selectTheme = useCallback((theme: CodexTheme | null) => {
    setSelectedTheme(theme);
    const url = new URL(window.location.href);
    if (theme) {
      url.searchParams.set("theme", theme.id);
    } else {
      url.searchParams.delete("theme");
    }
    window.history.replaceState(null, "", url.toString());
  }, []);

  const copyShareLink = useCallback((theme: CodexTheme) => {
    const shareUrl = `${window.location.origin}/share/${encodeURIComponent(theme.id)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let result = allThemes;
    if (selectedCategory !== "all") {
      result = result.filter(
        (t) => t.category.toLowerCase() === selectedCategory
      );
    }
    if (variantFilter !== "all") {
      result = result.filter((t) => t.variant === variantFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.codeThemeId.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.includes(q)) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allThemes, selectedCategory, variantFilter, search]);

  const colCount = useMemo(() => {
    // On mobile, force 1 or 2 columns maximum to avoid squashing
    if (isMobile) {
      return viewMode === "grid" ? 1 : 2;
    }
    if (!containerRef.current) return 4;
    const w = containerRef.current.clientWidth - 32;
    const min = viewMode === "grid" ? GRID_COL_MIN : COMPACT_COL_MIN;
    return Math.max(1, Math.floor((w + GAP) / (min + GAP)));
  }, [viewMode, sidebarOpen, selectedTheme, isMobile]);

  const rowCount = Math.ceil(filtered.length / Math.max(colCount, 1));
  const rowHeight = viewMode === "grid" ? GRID_ROW_H : COMPACT_ROW_H;

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight + GAP,
    overscan: 6,
  });

  const copyConfig = useCallback(
    (theme: CodexTheme, e?: React.MouseEvent) => {
      e?.stopPropagation();
      const config = encodeThemeConfig(theme);
      navigator.clipboard.writeText(config).then(() => {
        setCopiedId(theme.id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    },
    []
  );

  const categoryIcons: Record<string, string> = {
    all: "✦", editor: "⌘", brand: "◆", red: "🔴", orange: "🟠",
    yellow: "🟡", green: "🟢", cyan: "🔵", blue: "💙", purple: "💜",
    pink: "💗", neutral: "◐", nature: "🌿", mood: "🎭",
    accessibility: "♿", spectrum: "🌈", "duo-tone": "◑", framework: "⚡",
    city: "🏙", gradient: "🎨", contrast: "◉", soft: "☁",
  };

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ background: "var(--background)" }}>
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 z-40 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? 280 : 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 border-r overflow-hidden flex flex-col absolute inset-y-0 left-0 z-50 h-full md:relative bg-opacity-100 shadow-xl md:shadow-none"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div className="px-4 pt-5 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--accent), #6366f1)" }}
                >
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
                    Codex Themes
                  </h1>
                  <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                    {allThemes.length.toLocaleString()} themes
                  </p>
                </div>
              </div>
            </div>

            <nav aria-label="Theme categories" className="flex-1 overflow-y-auto px-2 pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider px-2 mb-2" style={{ color: "var(--muted)" }}>
                Categories
              </p>
              <div className="flex flex-col gap-0.5">
                {categories.map((cat) => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        if (isMobile) setSidebarOpen(false);
                      }}
                      className="flex items-center gap-2 px-2.5 py-2.5 md:py-1.5 rounded-lg text-left text-[14px] md:text-[13px] transition-colors"
                      style={{
                        background: active ? "var(--accent-dim)" : "transparent",
                        color: active ? "var(--accent)" : "var(--foreground)",
                      }}
                    >
                      <span className="text-base md:text-sm w-5 text-center">{categoryIcons[cat.id] || "●"}</span>
                      <span className="flex-1 truncate">{cat.name}</span>
                      <span className="text-[10px] tabular-nums" style={{ color: "var(--muted)" }}>{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
              <a
                href="codex://settings"
                className="flex items-center gap-1.5 text-[11px] hover:opacity-80"
                style={{ color: "var(--muted)" }}
              >
                Open Codex <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Toolbar */}
        <header
          className="shrink-0 flex items-center justify-between md:justify-start gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 border-b overflow-x-auto no-scrollbar"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="p-1.5 rounded-lg md:hidden shrink-0"
            style={{ background: "var(--surface-2)" }}
          >
            <SlidersHorizontal className="w-4 h-4" style={{ color: "var(--muted)" }} />
          </button>

          <div
            className="flex items-center gap-1.5 sm:gap-2 flex-1 md:max-w-md rounded-lg px-2 sm:px-3 py-1.5 border min-w-[140px]"
            style={{ background: "var(--background)", borderColor: "var(--border)" }}
          >
            <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--muted)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search themes…"
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "var(--foreground)" }}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
              </button>
            )}
          </div>

          <div className="flex items-center rounded-lg border overflow-hidden shrink-0" style={{ borderColor: "var(--border)" }}>
            {(["all", "light", "dark"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariantFilter(v)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs"
                style={{
                  background: variantFilter === v ? "var(--accent-dim)" : "var(--background)",
                  color: variantFilter === v ? "var(--accent)" : "var(--muted)",
                }}
              >
                {v === "light" && <Sun className="w-3 h-3" />}
                {v === "dark" && <Moon className="w-3 h-3" />}
                {v === "all" && <Sparkles className="w-3 h-3" />}
                <span className="hidden sm:inline capitalize">{v}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center rounded-lg border overflow-hidden shrink-0" style={{ borderColor: "var(--border)" }}>
            <button
              onClick={() => setViewMode("grid")}
              className="p-1.5"
              style={{
                background: viewMode === "grid" ? "var(--accent-dim)" : "var(--background)",
                color: viewMode === "grid" ? "var(--accent)" : "var(--muted)",
              }}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("compact")}
              className="p-1.5"
              style={{
                background: viewMode === "compact" ? "var(--accent-dim)" : "var(--background)",
                color: viewMode === "compact" ? "var(--accent)" : "var(--muted)",
              }}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-xs tabular-nums hidden md:block" style={{ color: "var(--muted)" }}>
            {filtered.length.toLocaleString()} themes
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 flex overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
            <div ref={containerRef}>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <Palette className="w-10 h-10" style={{ color: "var(--surface-3)" }} />
                  <p className="text-sm" style={{ color: "var(--muted)" }}>No themes match your search</p>
                </div>
              ) : (
                <div
                  style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {virtualizer.getVirtualItems().map((vRow) => {
                    const startIdx = vRow.index * colCount;
                    const rowThemes = filtered.slice(startIdx, startIdx + colCount);

                    return (
                      <div
                        key={vRow.key}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: `${vRow.size - GAP}px`,
                          transform: `translateY(${vRow.start}px)`,
                          display: "grid",
                          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
                          gap: `${GAP}px`,
                        }}
                      >
                        {rowThemes.map((theme) =>
                          viewMode === "grid" ? (
                            <GridCard
                              key={theme.id}
                              theme={theme}
                              isSelected={selectedTheme?.id === theme.id}
                              isCopied={copiedId === theme.id}
                              onClick={() => selectTheme(theme)}
                              onCopy={(e) => copyConfig(theme, e)}
                            />
                          ) : (
                            <CompactCard
                              key={theme.id}
                              theme={theme}
                              isSelected={selectedTheme?.id === theme.id}
                              isCopied={copiedId === theme.id}
                              onClick={() => selectTheme(theme)}
                              onCopy={(e) => copyConfig(theme, e)}
                            />
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Preview / Editor panel */}
          <AnimatePresence>
            {selectedTheme && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isMobile ? "100%" : (panelMode === "editor" ? 400 : 360), opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 border-l overflow-y-auto overflow-x-hidden absolute inset-y-0 right-0 z-50 h-full md:relative bg-opacity-100 shadow-xl md:shadow-none"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                {panelMode === "editor" ? (
                  <ThemeEditor
                    baseTheme={selectedTheme}
                    onClose={() => setPanelMode("preview")}
                  />
                ) : (
                  <PreviewPanel
                    theme={selectedTheme}
                    isCopied={copiedId === selectedTheme.id}
                    onCopy={() => copyConfig(selectedTheme)}
                    onClose={() => selectTheme(null)}
                    onCustomize={() => setPanelMode("editor")}
                    linkCopied={linkCopied}
                    onShareLink={() => copyShareLink(selectedTheme)}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function GridCard({
  theme,
  isSelected,
  isCopied,
  onClick,
  onCopy,
}: {
  theme: CodexTheme;
  isSelected: boolean;
  isCopied: boolean;
  onClick: () => void;
  onCopy: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className="theme-card group rounded-xl border cursor-pointer overflow-hidden flex flex-col"
      style={{
        borderColor: isSelected ? "var(--accent)" : "var(--border)",
        background: "var(--surface)",
        boxShadow: isSelected ? "0 0 0 1px var(--accent)" : "none",
      }}
      onClick={onClick}
    >
      <div className="p-2.5 pb-0 flex-1" style={{ minHeight: 80 }}>
        <CodexPreviewMini theme={theme} />
      </div>
      <div className="p-2.5 flex items-center gap-2">
        <div
          className="w-3.5 h-3.5 rounded-full shrink-0 border"
          style={{ background: theme.theme.accent, borderColor: `${theme.theme.accent}40` }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>
            {theme.name}
          </p>
          <p className="text-[10px] truncate" style={{ color: "var(--muted)" }}>
            {theme.variant} · {theme.category}
          </p>
        </div>
        <button
          onClick={onCopy}
          className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all"
          style={{ background: "var(--surface-2)" }}
        >
          {isCopied ? (
            <Check className="w-3 h-3" style={{ color: "#22c55e" }} />
          ) : (
            <Copy className="w-3 h-3" style={{ color: "var(--muted)" }} />
          )}
        </button>
      </div>
    </div>
  );
}

function CompactCard({
  theme,
  isSelected,
  isCopied,
  onClick,
  onCopy,
}: {
  theme: CodexTheme;
  isSelected: boolean;
  isCopied: boolean;
  onClick: () => void;
  onCopy: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className="theme-card group flex items-center gap-2.5 rounded-lg border px-3 py-2 cursor-pointer h-full"
      style={{
        borderColor: isSelected ? "var(--accent)" : "var(--border)",
        background: "var(--surface)",
      }}
      onClick={onClick}
    >
      <div className="flex gap-0.5 shrink-0">
        <div className="w-4 h-8 rounded-l" style={{ background: theme.theme.surface }} />
        <div className="w-4 h-8" style={{ background: theme.theme.accent }} />
        <div className="w-4 h-8 rounded-r" style={{ background: theme.theme.ink }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>{theme.name}</p>
        <p className="text-[10px]" style={{ color: "var(--muted)" }}>{theme.variant}</p>
      </div>
      <button
        onClick={onCopy}
        className="p-1 rounded opacity-0 group-hover:opacity-100 transition-all shrink-0"
        style={{ background: "var(--surface-2)" }}
      >
        {isCopied ? <Check className="w-3 h-3" style={{ color: "#22c55e" }} /> : <Copy className="w-3 h-3" style={{ color: "var(--muted)" }} />}
      </button>
    </div>
  );
}

function PreviewPanel({
  theme,
  isCopied,
  onCopy,
  onClose,
  onCustomize,
  linkCopied,
  onShareLink,
}: {
  theme: CodexTheme;
  isCopied: boolean;
  onCopy: () => void;
  onClose: () => void;
  onCustomize: () => void;
  linkCopied: boolean;
  onShareLink: () => void;
}) {
  const config = encodeThemeConfig(theme);
  const [configCopied, setConfigCopied] = useState(false);

  const copyConfigString = () => {
    navigator.clipboard.writeText(config).then(() => {
      setConfigCopied(true);
      setTimeout(() => setConfigCopied(false), 2000);
    });
  };

  const configPretty = JSON.stringify(
    { codeThemeId: theme.codeThemeId, theme: theme.theme, variant: theme.variant },
    null,
    2
  );

  return (
    <div className="w-full md:w-[360px] animate-slide-right">
      <div
        className="flex items-center justify-between px-4 py-3 border-b sticky top-0 z-10"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ background: theme.theme.accent }} />
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{theme.name}</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-md" style={{ background: "var(--surface-2)" }}>
          <X className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-5">
        <CodexPreview theme={theme} />

        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
            {theme.variant}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "var(--surface-2)", color: "var(--foreground)" }}>
            {theme.category}
          </span>
          {theme.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: "var(--surface-2)", color: "var(--muted)" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Color swatches */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Colors</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Accent", color: theme.theme.accent },
              { label: "Surface", color: theme.theme.surface },
              { label: "Ink", color: theme.theme.ink },
              { label: "Diff +", color: theme.theme.semanticColors.diffAdded },
              { label: "Diff -", color: theme.theme.semanticColors.diffRemoved },
              { label: "Skill", color: theme.theme.semanticColors.skill },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded border" style={{ background: color, borderColor: "var(--border)" }} />
                <div>
                  <p className="text-[9px]" style={{ color: "var(--muted)" }}>{label}</p>
                  <p className="text-[10px] font-mono" style={{ color: "var(--foreground)" }}>{color}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contrast */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Contrast</p>
            <span className="text-xs tabular-nums font-mono" style={{ color: "var(--foreground)" }}>{theme.theme.contrast}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
            <div className="h-full rounded-full" style={{ width: `${theme.theme.contrast}%`, background: theme.theme.accent }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {/* Copy button */}
          <button
            onClick={copyConfigString}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: configCopied ? "#22c55e" : theme.theme.accent,
              color: theme.variant === "light" && !configCopied ? "#ffffff" : theme.theme.surface,
            }}
          >
            {configCopied ? (<><Check className="w-4 h-4" /> Copied!</>) : (<><Copy className="w-4 h-4" /> Copy Theme Config</>)}
          </button>

          {/* Customize button */}
          <button
            onClick={onCustomize}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-90"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              background: "var(--surface-2)",
            }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Customize Theme
          </button>

          {/* Share link button */}
          <button
            onClick={onShareLink}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-90"
            style={{
              borderColor: linkCopied ? "#22c55e" : "var(--border)",
              color: linkCopied ? "#22c55e" : "var(--foreground)",
              background: linkCopied ? "rgba(34,197,94,0.1)" : "var(--surface-2)",
            }}
          >
            {linkCopied ? (
              <><Check className="w-4 h-4" /> Link Copied!</>
            ) : (
              <><Link className="w-4 h-4" /> Share Theme Link</>
            )}
          </button>
        </div>

        {/* Config string */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Config String</p>
            <button onClick={copyConfigString} className="text-[10px] flex items-center gap-1" style={{ color: "var(--accent)" }}>
              <Copy className="w-2.5 h-2.5" /> Copy
            </button>
          </div>
          <div
            className="rounded-lg p-3 font-mono text-[10px] leading-relaxed whitespace-pre-wrap break-words overflow-x-auto border"
            style={{ background: "var(--background)", color: "var(--foreground)", borderColor: "var(--border)" }}
          >
            <span style={{ color: "var(--accent)" }}>codex-theme-v1:</span> {configPretty}
          </div>
        </div>

        {/* How to apply */}
        <div className="rounded-lg p-3 border" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>How to Apply</p>
          <ol className="text-xs flex flex-col gap-1.5" style={{ color: "var(--foreground)" }}>
            <li className="flex gap-2">
              <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>1</span>
              <span>Open <a href="codex://settings" className="underline" style={{ color: "var(--accent)" }}>Codex</a></span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>2</span>
              Go to Settings → Appearance
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>3</span>
              Click &quot;Import&quot; and paste the config string
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
