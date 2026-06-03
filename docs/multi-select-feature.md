# Multi-Select Rubber-Band + Group Drag — Implementation Strategy

> Feature: Hold **Ctrl + drag** on the board to draw a selection rectangle. On release, entities inside the rectangle stay selected. Then drag any selected entity to move the whole group together.

---

## 1. Difficulty Estimate

**Medium.** The current architecture is mostly favorable, but there are friction points around drag conflicts and coordinate math.

---

## 2. Current Architecture — Key Observations

- **`src/components/uml-editor/parts/board/Board.tsx`**
  - Wraps content in a zoomable div using CSS `zoom`.
  - A single `Draggable` wraps the whole `<section class="board">` for panning.
- **`src/components/utils/draggable/Draggable.tsx`**
  - Each draggable instance manages its own drag lifecycle.
  - Position is tracked via a MobX `Position` (`entityPosition` prop) or local state.
  - Each entity uses its own `Draggable`.
- **CSS `zoom`** (not `transform: scale`)
  - Mouse coordinates are already "zoom-corrected" by the browser.
  - `getBoundingClientRect()` returns visual (zoomed) pixels.
- **Entity positions** are MobX `Position` instances → easy to mutate in bulk and trigger re-renders.

---

## 3. Friction Points

- **Drag conflict**: `Board`'s outer `Draggable` listens for `mousedown` on the whole board. `Ctrl+mousedown` must NOT start a board pan; it must start a selection rectangle instead.
- **Coordinate transform**: the rubber-band rectangle needs board-local coordinates (current pan offset + zoom) to test against entity positions.
- **No central selection state** exists today. Need a `SelectionStore` (MobX) holding selected entity ids and references to their `Position` instances.
- **Group drag**: requires multiple `Draggable`s to move in sync. Either lift drag logic up, or broadcast deltas from one entity's drag to all selected entities.

---

## 4. Approach Options

### Option A — Selection Layer + Delta Broadcast (Recommended)

Add a `SelectionLayer` component inside `Board` that:

1. Listens for `mousedown` with `e.ctrlKey` → starts the rectangle, stops propagation so the board pan does not activate.
2. Renders a `<div>` overlay rectangle that follows the mouse during drag.
3. On `mouseup`: queries each registered entity's `Position` against the rectangle bounds → adds matching ids to a `SelectionStore`.
4. On a regular drag of any selected entity: that entity's `Draggable` reports the delta to `SelectionStore`, which applies the same delta to all other selected `Position` instances.

**Pros:**
- Minimal changes to existing `Draggable`.
- Group drag piggybacks on existing per-entity drag; you just multicast position updates.
- MobX `Position` mutations re-render entities automatically.

**Cons:**
- Each `Draggable` must know about `SelectionStore` (small `useSelection()` hook).
- Hit-testing rectangle vs. entity bounds requires knowing each entity's width/height.

**Sketch:**

```ts
// SelectionStore.ts
class SelectionStore {
  ids = observable.set<string>()
  positions = new Map<string, Position>() // entities register on mount

  applyDelta(dx: number, dy: number, exceptId: string) {
    this.ids.forEach((id) => {
      if (id === exceptId) return
      const p = this.positions.get(id)
      p?.setPosition(p.x + dx, p.y + dy)
    })
  }
}
```

Inside `Draggable.onMove`, after updating its own `entityPosition`, compute delta and call `selectionStore.applyDelta(dx, dy, myId)` if `myId` is selected.

### Option B — Lift Drag into a Controller

A `DragController` owns drag state for selected entities; entities subscribe their `Position` to it. Cleaner separation, but bigger refactor of `Draggable`.

### Option C — SVG Marquee + Transform Group

Wrap selected entities in an SVG `<g transform="translate(dx, dy)">` during drag, commit on release. Best perf for many entities, but entities are HTML `<div>`s today, so it requires structural changes.

---

## 5. Recommended Implementation Order

1. **`SelectionStore`** (MobX): `ids: Set<string>`, register/unregister `Position` refs, `applyDelta`, `clear`.
2. **`SelectionLayer`** as a child of `Board`: handles Ctrl+drag rectangle (CSS-positioned div with `pointer-events: none` except during drag). Convert client coords to board-local using the board `Draggable`'s current offset and `scale`.
3. **Modify `Draggable`** (small): accept optional `id`. On `mousedown`: if `id ∈ selection` and Ctrl is not held → group drag mode. On move: broadcast delta to the selection store.
4. **Visual feedback**: add `data-selected` attribute on the entity for an outline style.
5. **Deselect**: click on empty board (no Ctrl, no Shift) → `selection.clear()`.

---

## 6. Codebase-Specific Gotchas

- **CSS `zoom`** in `Board.tsx`: when computing rectangle bounds in board-local space, divide client deltas by `scale` (same pattern already used in `Draggable.tsx:46-51`). Avoid `getBoundingClientRect()` for entity hit-tests — read `Position.x/y` plus a known entity size from the model.
- **Outer `Draggable` in `Board`** consumes `mousedown` on the whole board. Either:
  - Add `if (e.ctrlKey) return` early in `Draggable.onMouseDown` so the event bubbles to `SelectionLayer`, or
  - Render `SelectionLayer` above the board's `Draggable` and `stopPropagation` from it.
- **Persistence**: `Board` persists position to localStorage; entities likely persist via their own MobX models. Group drag should naturally trigger each entity's existing persistence path.
- **Touch**: skip the Ctrl-equivalent for v1 (no clean standard gesture). Ship desktop-only first.

---

## 7. TL;DR

Use **Option A**: add a `SelectionStore`, a `SelectionLayer` inside `Board` for the rubber-band rectangle, and a small modification to `Draggable` to broadcast deltas when its entity is in the selection. Expected size: ~150–250 LOC across 3–4 new files plus small edits to `Draggable.tsx` and `Board.tsx`.

---

## 8. File-Level Plan

| File | Change |
| --- | --- |
| `src/stores/SelectionStore.ts` | **NEW** — MobX store with selection set, position registry, `applyDelta`, `clear`. |
| `src/components/uml-editor/parts/board/SelectionLayer.tsx` | **NEW** — Ctrl+drag rectangle, computes hits, updates store. |
| `src/components/uml-editor/parts/board/SelectionLayer.scss` | **NEW** — Rectangle styling. |
| `src/components/uml-editor/parts/board/Board.tsx` | Mount `SelectionLayer`; allow Ctrl+mousedown to bypass board pan. |
| `src/components/utils/draggable/Draggable.tsx` | Accept `id`; broadcast deltas to selection store when selected. |
| Entities (e.g. `Entity.tsx`) | Pass `id` to `Draggable`; register `Position` with `SelectionStore` on mount. |
