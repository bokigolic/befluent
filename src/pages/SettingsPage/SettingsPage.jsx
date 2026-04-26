import { useState, memo } from "react";
import useStore from "../../store/useStore";
import styles from "./SettingsPage.module.css";

const GOAL_OPTIONS = [3, 5, 10, 15];
const MODE_OPTIONS = [
  { id: "en-en", label: "EN→EN" },
  { id: "en-sr", label: "EN→SR" },
  { id: "sr-en", label: "SR→EN" },
];

function SettingsPage({ onClose }) {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const dailyGoal = useStore((s) => s.dailyGoal);
  const setDailyGoal = useStore((s) => s.setDailyGoal);
  const dictMode = useStore((s) => s.dictMode);
  const setDictMode = useStore((s) => s.setDictMode);
  const instantSearch = useStore((s) => s.instantSearch);
  const toggleInstant = useStore((s) => s.toggleInstantSearch);
  const totalSearches = useStore((s) => s.totalSearches);
  const xp = useStore((s) => s.xp);
  const completedLessons = useStore((s) => s.completedLessons);
  const practiceResults = useStore((s) => s.practiceResults);
  const reviewSessionsCount = useStore((s) => s.reviewSessionsCount);

  const [showReset, setShowReset] = useState(false);

  const handleExport = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        data[key] = JSON.parse(localStorage.getItem(key));
      } catch {
        data[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: "befluent-data.json",
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <button className={styles.back} onClick={onClose}>
          ← Back
        </button>
        <span className={styles.title}>Settings</span>
      </div>

      <div className={styles.content}>
        {/* ── Preferences ── */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Preferences</div>

          <div className={styles.row}>
            <span className={styles.rowLabel}>Daily goal</span>
            <div className={styles.optionGroup}>
              {GOAL_OPTIONS.map((n) => (
                <button
                  key={n}
                  className={`${styles.optBtn} ${dailyGoal === n ? styles.optBtnActive : ""}`}
                  onClick={() => setDailyGoal(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <span className={styles.rowLabel}>Default mode</span>
            <div className={styles.optionGroup}>
              {MODE_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  className={`${styles.optBtn} ${dictMode === m.id ? styles.optBtnActive : ""}`}
                  onClick={() => setDictMode(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <span className={styles.rowLabel}>Instant search</span>
              <div className={styles.rowSub}>
                Auto-search as you type (600ms delay)
              </div>
            </div>
            <button
              className={`${styles.toggle} ${instantSearch ? styles.toggleOn : ""}`}
              onClick={toggleInstant}
            >
              <div className={styles.toggleKnob} />
            </button>
          </div>

          <div className={styles.row}>
            <span className={styles.rowLabel}>Theme</span>
            <button
              className={`${styles.optBtn} ${styles.optBtnActive}`}
              onClick={toggleTheme}
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>

        {/* ── Stats summary ── */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Stats Summary</div>
          <div className={styles.statsList}>
            {[
              ["Words searched", totalSearches],
              ["Total XP earned", xp],
              ["Lessons completed", completedLessons.length],
              ["Practice sessions", Object.keys(practiceResults).length],
              ["Review sessions", reviewSessionsCount],
            ].map(([label, val]) => (
              <div key={label} className={styles.statRow}>
                <span className={styles.statLabel}>{label}</span>
                <span className={styles.statVal}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Account data ── */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Account Data</div>
          <button className={styles.exportBtn} onClick={handleExport}>
            ⬇ Export my data
          </button>
          <button
            className={styles.resetBtn}
            onClick={() => setShowReset(true)}
          >
            🗑 Reset all progress
          </button>
        </div>

        {/* ── About ── */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>About</div>
          <div className={styles.aboutList}>
            <div className={styles.aboutRow}>
              <span className={styles.aboutLabel}>Version</span>
              <span className={styles.aboutVal}>3.12</span>
            </div>
            <div className={styles.aboutRow}>
              <span className={styles.aboutLabel}>Built</span>
              <span className={styles.aboutVal}>BG-VEB</span>
            </div>
            <div className={styles.aboutRow}>
              <span className={styles.aboutLabel}>Translation</span>
              <span className={styles.aboutVal}>MyMemory API</span>
            </div>
            <div className={styles.aboutRow}></div>
          </div>
          <div className={styles.shortcuts}>
            <div className={styles.sectionTitle} style={{ marginBottom: 8 }}>
              Keyboard Shortcuts
            </div>
            {[
              ["/", "Focus search"],
              ["Escape", "Close overlay / clear search"],
              ["↑ ↓", "Navigate autocomplete"],
              ["Enter", "Confirm search"],
            ].map(([key, desc]) => (
              <div key={key} className={styles.shortcutRow}>
                <kbd className={styles.kbd}>{key}</kbd>
                <span className={styles.shortcutDesc}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reset confirmation modal ── */}
      {showReset && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>Reset all progress?</div>
            <p className={styles.modalText}>
              This will permanently delete all your words, XP, achievements, and
              review cards. This cannot be undone.
            </p>
            <div className={styles.modalBtns}>
              <button
                className={styles.modalCancel}
                onClick={() => setShowReset(false)}
              >
                Cancel
              </button>
              <button className={styles.modalConfirm} onClick={handleReset}>
                Yes, reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(SettingsPage);
