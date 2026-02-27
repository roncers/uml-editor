import { ClassSynec } from "@/classes/ClassSynec"
import "./UMLEditor.scss"
import Entity from "@/components/uml-editor/parts/entity/Entity"
export default function UMLEditor() {
  return (
    <div className="uml-editor">
      <Entity entity={new ClassSynec('manoli')}></Entity>
    </div>
  )
}
