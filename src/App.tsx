import Header from "./components/header/Header"
import UMLEditor from "./components/uml-editor/UMLEditor"
import "./App.scss"

function App() {
  return (
    <div className="app-container">
      <Header />
      <UMLEditor />
      {/* <InfoPanel /> */}
      {/* <Footer /> */}
    </div>
  )
}

export default App
