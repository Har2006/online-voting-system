import AuthPage from "./pages/AuthPage";

function App() {
  console.log("App name:", process.env.REACT_APP_APP_NAME);
  return <AuthPage />;
}

export default App;
