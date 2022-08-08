import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
 
function App() {
  return (
    <BrowserRouter>
      
      <main className="py-3">
        <Container>
          <Routes>
            {" "}
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      
    </BrowserRouter>
  );
}
 
export default App;
