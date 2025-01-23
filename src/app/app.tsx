import { Route, Routes } from 'react-router-dom';
import Header from '@components/layout/header/Header';
import { useEffect, useMemo } from 'react';
import { useCampaignStore } from './stores/campaingStore';
import { data } from '@app/data/mock';
import Campaigns from './routes/campaigns/Campaigns';

function App() {
  const { populateCampaigns } = useCampaignStore();
  const PublicRoutes = useMemo(() => {
    return [
      { path: '/', component: <></> },
      { path: '/campaigns', component: <Campaigns /> },
    ];
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
      <main>
        <Header></Header>
        <section className="w-full h-full">
          <Routes>
            {PublicRoutes.map((rout, i) => {
              return (
                <Route
                  key={i}
                  path={rout.path}
                  element={rout.component}
                ></Route>
              );
            })}
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
