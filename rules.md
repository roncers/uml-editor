## Coding Rules & Best Practices

### SOLID Principles
1. **Single Responsibility Principle (SRP)**
	- Each class or function should have one clear responsibility.
	- Entity classes, factories, and renderers must not mix concerns (e.g., avoid combining UI logic with entity management).

2. **Open/Closed Principle (OCP)**
	- Classes should be open for extension but closed for modification.
	- Use abstract base classes and interfaces for entities and factories, allowing new types without changing existing code.

3. **Liskov Substitution Principle (LSP)**
	- Subclasses must be substitutable for their base classes.
	- Ensure all entity and factory subclasses can be used interchangeably in the editor workflow.

4. **Interface Segregation Principle (ISP)**
	- Prefer small, focused interfaces over large, general ones.
	- Define clear interfaces for entity properties, relationships, and actions.

5. **Dependency Inversion Principle (DIP)**
	- Depend on abstractions, not concrete implementations.
	- Use context providers and dependency injection for passing actions and state, not direct class instances.

### MobX Reactivity Rules
1. **Entity mutations via methods only** — All changes to entity state (name, properties, functions, relationships) must go through the entity's own methods (e.g., `setName()`, `addProperty()`). Never assign observable fields directly from a React component.
2. **`observer` wrapping is mandatory** — Every React component that reads any MobX observable field must be wrapped in `observer` from `mobx-react-lite`. No exceptions.
3. **No React state for entity data** — `useState` is forbidden for storing or mirroring entity properties, relationships, or entity-level UI state. It is only permitted for:
	- Entity list length triggers (add/remove re-render in `UMLEditor`).
	- Pure UI concerns unrelated to entities (modal visibility, tooltip state, etc.).
4. **No `useEffect` for entity sync** — Never use `useEffect` to watch or synchronize entity data. MobX `observer` handles reactivity automatically.
5. **Serialization contract** — Every entity class must implement a `toJSON(): object` method returning a plain-object snapshot of its state. This enables future export/import functionality.

### Architecture Alignment
- React is a **rendering layer**; MobX owns entity state and reactivity.
- Pass entity lists and workflow objects as props/context, not as local state.
- All entity mutations must go through entity methods, not direct array or field manipulation.
- Renderer components must be stateless `observer` wrappers that reflect current observable state.
- Use context for actions (e.g., `createEntity`) and positions, not for entity data.
- Avoid duplicating entity state in multiple places; always reference the observable source.
- Factories handle entity **creation** only; post-creation logic belongs to the entity itself.

### General Best Practices
- Write clear, descriptive names for classes, functions, and variables.
- Keep functions and methods short and focused.
- Use TypeScript types and interfaces for all entities and props.
- Document public APIs and architectural decisions.
- Write modular, reusable code; avoid hard-coding values.
- Test entity logic and UI rendering separately.

### Examples
```typescript
// Good: Entity creation via factory
const newEntity = entityFactory.createEntity();
// Bad: Directly pushing to entity array
entityList.push(newEntity);
```

```typescript
// Good: Mutating entity state through its method
entity.setName('UserService');
// Bad: Direct assignment from a component
entity.name = 'UserService';
```

```typescript
// Good: Component wrapped in observer
const EntityCard = observer(({ entity }) => <div>{entity.name}</div>);
// Bad: Component reading observables without observer
const EntityCard = ({ entity }) => <div>{entity.name}</div>;
```

Follow these rules to ensure code quality, maintainability, and architectural consistency in the UML editor.
