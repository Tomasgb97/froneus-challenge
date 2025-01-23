import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/header/Header";
import { useMemo } from "react";



function App() {

  const PublicRoutes = useMemo(() => {
    return [
      { path: '/', component: <></> },

    ];
  }, []);

  return (
    <>
    <Header></Header>
    <main>
    <Routes>
          {PublicRoutes.map((rout, i) => {
            return (
              <Route key={i} path={rout.path} element={rout.component}></Route>
            );
          })}
        </Routes>
     
      </main>
      </>
    
  );
}

export default App;
