import { Route, Routes } from 'react-router-dom';
import Header from '@components/layout/header/Header';
import { useEffect, useMemo } from 'react';
import { useCampaignStore } from './stores/campaingStore';
import { data } from '@app/data/mock';
import Campaigns from './routes/campaigns/Campaigns';
import { useReceiverStore } from './stores/recieversStore';
import Home from './routes/home/Home';
import Footer from '@components/layout/footer/Footer';

function App() {
  const { populateCampaigns } = useCampaignStore();
  const { populateReceivers } = useReceiverStore();
  const PublicRoutes = useMemo(() => {
    return [
      { path: '/', component: <Home /> },
      { path: '/campaigns', component: <Campaigns /> },
    ];
  }, []);

  const campaignsData = useMemo(() => {
    return localStorage.getItem('campaign-items');
  }, []);
  const receiversData = useMemo(() => {
    return localStorage.getItem('receiver-items');
  }, []);

  useEffect(() => {
    if (!campaignsData) {
      populateCampaigns(data.campaigns);
    }
    if (!receiversData) {
      populateReceivers(data.people);
    }
  }, []);

  return (
    <>
      <main className="min-h-dvh flex flex-col items-center justify-between">
        <Header />
        <section className="w-full max-w-container-max h-full flex justify-center">
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
        <Footer />
      </main>
    </>
  );
}

export default App;
