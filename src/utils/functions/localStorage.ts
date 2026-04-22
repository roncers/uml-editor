import { EntityFactory } from "@/classes/factories/EntityFactory"

// TODO: pick it up as an environment variable
const LOCAL_STORAGE_KEY = "martin-roncero-uml-editor"

export function loadFromLocalStorage(): void {
  // Guard: if entities are already hydrated (caused by React StrictMode)
  if (EntityFactory.createdEntities.length > 0) return

  const data = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (data) {
    const convertedData = EntityFactory.fromString(data)
    EntityFactory.setEntities(convertedData)
  }
}

export function storeToLocalStorage(): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, EntityFactory.toString())
}


