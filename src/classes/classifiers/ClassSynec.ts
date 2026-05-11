import type { ClassSynec as ClassSynecInterface } from "@/interfaces/classes/ClassSynec.interface"
import type { RelationshipSynec } from "@/interfaces/RelationshipSynec.interface"
import { Position } from "@/classes/members/Position"
import { PropertySynec } from "@/classes/members/PropertySynec"
import { FunctionSynec } from "@/classes/members/FunctionSynec"
import { makeObservable, runInAction, action } from "mobx"
import { type ClassStateType, ClassStateEnum } from "@/types/entity.types"
import { relationshipType } from "@/types/interface.types"
import { EntityFactory } from "@/classes/factories/EntityFactory"

export class ClassSynec implements ClassSynecInterface {
  id: string
  name: string
  properties: PropertySynec[]
  functions: FunctionSynec[]
  relationships: RelationshipSynec[]
  state: ClassStateType
  isToggling: boolean
  position: Position

  constructor(
    name = "",
    positions: number[] = [0, 0],
    properties: PropertySynec[] = [],
    functions: FunctionSynec[] = [],
    relationships: RelationshipSynec[] = [],
    entityId?: string,
  ) {
    this.id = entityId || self.crypto.randomUUID()
    this.name = name
    this.position = new Position(positions[0], positions[1])
    this.properties = properties
    this.functions = functions
    this.relationships = relationships
    this.state = ClassStateEnum.default
    this.isToggling = false
    makeObservable(this, {
      name: true,
      properties: true,
      functions: true,
      relationships: true,
      state: true,
      isToggling: true,
      position: true,
      setName: action,
      setProperties: action,
      setFunctions: action,
      addFunction: action,
      addRelationship: action,
      deleteRelationship: action,
      setRelationships: action,
      setRelationshipDestiny: action,
      addProperty: action,
      inheritFrom: action,
      pruneEmptyMembers: action,
      syncImplementors: action,
      toggleEditionWithLock: action,
      toggleEdition: action,
    })
  }

  public setName(name: string): void {
    this.name = name
  }

  public setProperties(properties: PropertySynec[]): void {
    this.properties = properties
  }

  public setFunctions(functions: FunctionSynec[]): void {
    this.functions = functions
  }

  public setRelationships(relationships: RelationshipSynec[]): void {
    this.relationships = relationships
  }

  public addProperty(property: PropertySynec): void {
    this.properties.push(property)
  }

  public addFunction(function_: FunctionSynec): void {
    this.functions.push(function_)
  }

  public addRelationship(relationship: RelationshipSynec): void {
    this.relationships.push(relationship)
  }

  public deleteRelationship(relationshipId: string): void {
    this.relationships = this.relationships.filter(
      (r) => r.id !== relationshipId,
    )
  }

  public toggleEdition(): void {
    const wasEditing = this.state === ClassStateEnum.editing
    this.state = wasEditing ? ClassStateEnum.default : ClassStateEnum.editing

    if (wasEditing) {
      this.pruneEmptyMembers()
      this.syncImplementors()
    }
  }

  public toggleEditionWithLock(lockMs = 150): void {
    if (this.isToggling) return
    this.isToggling = true
    this.toggleEdition()

    setTimeout(() => {
      runInAction(() => {
        this.isToggling = false
      })
    }, lockMs)
  }

  public toggleSelection(): void {
    this.state =
      this.state === ClassStateEnum.selected
        ? ClassStateEnum.default
        : ClassStateEnum.selected
  }

  public setRelationshipDestiny(entityId: string): void {
    const lastRelationship = this.relationships[this.relationships.length - 1]
    if (!lastRelationship) return
    lastRelationship.destination = entityId

    if (lastRelationship.type === relationshipType.implementation) {
      const target = EntityFactory.createdEntities.find(
        (entity) => entity.id === entityId,
      )
      if (target) this.inheritFrom(target as ClassSynec)
    }
  }

  public pruneEmptyMembers(): void {
    this.properties = this.properties.filter((p) => p.name.trim() !== "")
    this.functions = this.functions.filter((f) => f.name.trim() !== "")
  }

  public syncImplementors(): void {
    for (const entity of EntityFactory.createdEntities) {
      const implementsThis = entity.relationships.some(
        (rel) =>
          rel.type === relationshipType.implementation &&
          rel.destination === this.id,
      )
      if (implementsThis) {
        (entity as ClassSynec).inheritFrom(this)
      }
    }
  }

  public inheritFrom(source: ClassSynec): void {
    const ownPropertyNames = new Set(this.properties.map((p) => p.name))
    for (const prop of source.properties) {
      if (ownPropertyNames.has(prop.name)) continue
      this.addProperty(
        new PropertySynec(prop.name, prop.type, prop.visibility),
      )
    }

    const ownFunctionNames = new Set(this.functions.map((f) => f.name))
    for (const fn of source.functions) {
      if (ownFunctionNames.has(fn.name)) continue
      this.addFunction(new FunctionSynec(fn.name, fn.visibility))
    }
  }
}
