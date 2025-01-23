import { Route, Routes } from 'react-router-dom';
import Header from '@components/layout/header/Header';
import { useEffect, useMemo } from 'react';
import { useCampaignStore } from './stores/campaingStore';
import { data } from '@app/data/mock';

function App() {
  const { populateCampaigns } = useCampaignStore();
  const PublicRoutes = useMemo(() => {
    return [{ path: '/', component: <></> }];
  }, []);

  const campaignsData = useMemo(() => {
    return localStorage.getItem('campaign-items');
  }, []);

  useEffect(() => {
    if (!campaignsData) {
      populateCampaigns(data.campaigns);
    }
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
