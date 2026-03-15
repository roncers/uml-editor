## UML Editor Architecture

### Core Principle

**MobX is the primary reactivity engine. React is a declarative rendering layer.**

All business logic and mutation state lives inside MobX-observable entity objects. React components exist only to render the current observable state and dispatch user intents back to entity methods. `useState` and `useEffect` must **never** be used for entity-level data or business logic.

### Entity-Level Observability

Every UML entity (`ClassSynec`, `InterfaceSynec`, and future types) is a **standalone MobX observable** created with `makeAutoObservable(this)` in its constructor.

- All property, function, relationship, and state mutations are performed through **entity methods** (e.g., `setName()`, `addProperty()`, `addRelationship()`).
- Components never mutate entity fields directly — they call entity methods, and MobX propagates the change to every `observer` that reads the affected field.
- Each entity owns its own identity (`id`), members, relationships, and UI state (e.g., `ClassStateEnum`).

```
ClassSynec (makeAutoObservable)
├── id, name, state
├── properties[]   ← observable array
├── functions[]    ← observable array
├── relationships[] ← observable array
└── mutation methods: setName(), addProperty(), addFunction(), …
```

### Entity List Management

The entity list is maintained as a **static array** on the abstract `EntityFactory` class (`EntityFactory.createdEntities`).

- Adding or removing entities from this list is a simple operation with only two entry points (`addEntity` / future `removeEntity`).
- A minimal `useState` trigger in `UMLEditor.tsx` is acceptable **exclusively** for re-rendering when the list length changes (add/remove). This is the only sanctioned use of React state for data.
- The list itself is **not** wrapped in a MobX store because the overhead of a full store is unjustified for two operations.

### React as a Rendering Layer

| Allowed in React components              | Forbidden in React components                     |
|------------------------------------------|---------------------------------------------------|
| `observer()` wrapper (mobx-react-lite)   | `useState` for entity properties or relationships |
| Reading observable fields in JSX         | `useEffect` to sync entity data                   |
| Calling entity methods on user events    | Direct property assignment on entities             |
| `useState` for pure UI concerns (modals, tooltips) | Business logic or derived calculations    |

Every component that reads any observable field **must** be wrapped in `observer` from `mobx-react-lite`. This ensures fine-grained re-rendering — only the component that reads a changed field will update.

### Factory Pattern

Factories (`ClassFactory`, `InterfaceFactory`) follow the **Single Responsibility Principle**:

1. A factory's only job is to **instantiate** a new observable entity and **register** it in the shared entity list.
2. Factories do not manage entity state after creation — that responsibility belongs to the entity itself.
3. New entity types are added by creating a new Factory subclass and a corresponding entity class, without modifying existing code (**Open/Closed Principle**).

### Dependency Flow

```
App
 └─ UMLEditor                       ← useState only for entity list length trigger
     ├─ EntityContext.Provider       ← provides createEntity action
     ├─ EntityPositionsProvider      ← provides position-related context
     └─ Board
         ├─ observer(EntitiesRenderer)   ← reads entity observable fields
         │    └─ observer(EntityCard)     ← reads individual entity state
         └─ observer(RelationshipsRenderer)
```

Data flows **down** via props and context; mutations flow **inward** via entity method calls. MobX handles the reactivity loop — no manual state syncing required.

### Serialization Roadmap

The architecture is designed to be **fully serializable**:

1. **Export (`toJSON`)**: Every entity class must implement a `toJSON(): object` method that returns a plain-object snapshot of its observable state (id, name, properties, functions, relationships, state).
2. **Import (`hydrate`)**: A utility function (or static factory method) will accept a JSON/txt payload, parse it, and reconstruct observable entity instances via the appropriate factory, restoring the full diagram.
3. **Format**: The serialization target is a `.json` file (with `.txt` as an alternative extension). The schema will be an array of entity snapshots plus metadata (version, timestamp).

```typescript
// Future API surface
const json = entities.map(e => e.toJSON());
const restored = hydrateDiagram(json); // returns Entity[]
```

This design keeps serialization logic **inside the entity layer**, not in React components.

### Summary

| Concern               | Owner                        |
|-----------------------|------------------------------|
| Entity state & logic  | MobX observable entities     |
| Entity creation       | Factory classes              |
| Entity list           | `EntityFactory.createdEntities` + minimal `useState` |
| Rendering             | React `observer` components  |
| Serialization         | Entity `toJSON()` + hydrate utility |

The UML Editor is reactive, consistent, and scalable. MobX owns the truth; React just paints it.