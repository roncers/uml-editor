# Performance & Memory Leak Audit

## 🔴 Critical Issues

### 1. `trackUpdates` — 6 global listeners always active + setTimeout spam XXX Popover delete relationship left

**File:** `src/utils/functions/arrow-updater.ts`

**Problems:**
- **6 document-level listeners** (`mousemove`, `contextmenu`, `click`, `dblclick`, `touchstart`, `touchmove`) + `keydown` are always active, even when no relationships exist.
- `mousemove` fires **60+ times/sec** → calls `onMove` → triggers **2 `setState` calls + 1 `requestAnimationFrame`** on every single pixel move, even when there's no pending relationship being drawn.
- `renderMultipleTimes()` fires **10 blind `setTimeout`s** on every Enter key press and also on mount. These are untracked — if the component unmounts before they fire, they call `onMove` on stale state. X
- Listening to `contextmenu`, `click`, `dblclick` for position tracking is unnecessary overhead. X

**Fix:** Only attach listeners when `creatingNew` is true. Replace the setTimeout spam with a single `ResizeObserver` or MobX `reaction` on entity changes. Guard timeouts with a cleanup ref.

---

### 2. `RelationshipsRenderer` — extreme re-render pressure 

**File:** `src/components/uml-editor/parts/renderers/relationships-renderer/RelationshipsRenderer.tsx`

**Problems:**
- **Every mouse move** triggers `setMouse` + `setOrigin` inside rAF → **2 React re-renders per frame** even when no rubber-band is being drawn.
- `forceRender` on every `scale` change is a hack that causes an extra synchronous re-render. 
- `getCoordinates()` is called inline during render for **every established relationship** — this does DOM queries  (`getElementById` + `getBoundingClientRect`) during the render phase. TODO

**Fix:** Gate `setMouse`/`setOrigin` behind `if (!sourceIdRef.current) return` early. Remove `forceRender` — if `scale` is from `useZoom()` context, the observer already re-renders. Move `getCoordinates` into a memoized structure or use MobX computed values.

---

### 3. `SelectionLayer` — `mousemove` listener leak XXX

**File:** `src/components/utils/selection-layer/SelectionLayer.tsx`

**Problem:** If `mouseup` fires outside the `.selection-layer` div (e.g. over the portal overlay or outside the window), `handleMouseUp` never runs → the `mousemove` listener **leaks permanently**.

**Fix:** Attach `mouseup` on `document` (like `Draggable` does), not on the component div. Also clean up in a `useEffect` return.

---

### 4. `SelectionStore` holds raw DOM `Element` references

**File:** `src/components/uml-editor/parts/board/SelectionMenuProvider.tsx`

**Problem:** Storing DOM elements in a MobX store means deleted entities' DOM nodes are retained in memory until `clearSelection()` is called. If you delete an entity while it's selected, its entire DOM subtree is kept alive as a memory leak. Also, `isSelected` and `applyDelta` iterate via `el.id` comparisons when you already have a `Map<string, EntityPosition>`.

**Fix:** Store entity **ids** (strings) instead of `Element` references. Use the CSS class toggling via a ref or a dedicated MobX computed. Look up positions via the already-existing `entityPositions` map.

---

## 🟡 Medium Issues

### 5. `UMLEditor` — factories recreated every render

**File:** `src/components/uml-editor/UMLEditor.tsx`

New `ClassFactory` and `InterfaceFactory` instances are created on every render. These are stateless, so it's wasted allocation. Move outside the component or wrap in `useMemo`.

---

### 6. `UMLEditor` — unstable context value

**File:** `src/components/uml-editor/UMLEditor.tsx`

A new object literal is created every render for `EntityContext.Provider value` → every consumer of `EntityContext` re-renders even if nothing changed. Wrap in `useMemo`.

---

### 7. `Board` — inline arrow function on each render

**File:** `src/components/uml-editor/parts/board/Board.tsx`

`onUpdatePosition={(x, y) => updateInternalPos(x, y)}` creates a new closure every render passed to `Draggable`.

---

### 8. `EntitiesRenderer` — missing `observer` wrapper

**File:** `src/components/uml-editor/parts/renderers/entities-renderer/EntitiesRenderer.tsx`

This component receives MobX entities and accesses `entity.id`, `entity.position`, `entity.relationships` indirectly. Per the architecture rules, it should be `observer`-wrapped.

---

### 9. Index-based keys for dynamic lists

**File:** `src/components/uml-editor/parts/entity/states/edition-entity/EditionEntity.tsx`

Properties and functions use `key={indx}`. When you add/remove/reorder items, React can't match the right component → input focus loss, stale state, unnecessary remounts. Use a stable id from each `PropertySynec`/`FunctionSynec`.

---

### 10. `EntityInput` — missing `observer`

**File:** `src/components/uml-editor/parts/entity/states/edition-entity/parts/entity-input/EntityInput.tsx`

Receives `entity.name` as `value` from an `observer` parent, so it works — but it's fragile. If ever called with an observable directly, it would miss updates.

---

### 11. `Entity.tsx` — `isMobile` computed once at module load

**File:** `src/components/uml-editor/parts/entity/Entity.tsx`

`const isMobile = window.matchMedia("(max-width: 1024px)").matches` never updates if the user resizes or rotates a device. Use a `matchMedia` listener or check on each render.

---

### 12. `EntityFactory.deleteEntity` — orphaned relationships

**File:** `src/classes/factories/EntityFactory.ts`

When an entity is deleted, relationships from **other** entities pointing to it (via `destination === id`) are not cleaned up → broken arrows, stale references.

---

## 🟢 Minor / Style

### 13. `latestRef` in `UMLEditor` is never read

**File:** `src/components/uml-editor/UMLEditor.tsx`

`latestRef` is kept in sync but never consumed anywhere. Dead code.

---

### 14. `Draggable` reads `localPos` inside `onMove` closure — stale value

**File:** `src/components/utils/draggable/Draggable.tsx`

`localPos` is captured at `startDrag` call time. During continuous drag, `localPos` state may lag behind. For entity drags this doesn't matter (it uses `entityPosition` which is MobX), but for board pan (`localPos` path) the delta calculation for `applyDelta` would be wrong if selection were active.

---

## Summary — Priority Order

| # | Severity | Issue | Impact |
|---|----------|-------|--------|
| 1 | 🔴 | `trackUpdates` always-on global listeners + setTimeout spam | Continuous CPU/GC churn on every mouse move |
| 2 | 🔴 | `RelationshipsRenderer` 2 setState per frame + render-phase DOM queries | Main thread blocking, jank |
| 3 | 🔴 | `SelectionLayer` mousemove listener leak | Permanent listener accumulation |
| 4 | 🔴 | `SelectionStore` stores DOM Element refs | Memory leak on entity deletion |
| 5 | 🟡 | Factory + context value recreated each render | Unnecessary re-renders |
| 6 | 🟡 | Index keys for properties/functions | Focus loss, incorrect reconciliation |
| 7 | 🟡 | Missing `observer` on `EntitiesRenderer` | Fragile, may miss updates |
| 8 | 🟡 | `deleteEntity` leaves orphaned relationships | Broken arrows |
| 9 | 🟢 | Dead `latestRef`, stale `isMobile`, minor closures | Code cleanliness |
