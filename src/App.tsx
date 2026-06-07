import Header from "./components/header/Header"
import UMLEditor from "./components/uml-editor/UMLEditor"
import UpdatingContextProvider from "./components/uml-editor/parts/renderers/relationships-renderer/UpdatingContext"

import "./App.scss"

function App() {
  return (
    <UpdatingContextProvider>
      <div className="app-container">
        <div className="app-container__border" />
        <Header />
        <UMLEditor />
      </div>
    </UpdatingContextProvider>
  )
}

export default App
