import { Route, Routes } from 'react-router-dom';
import Header from '@components/layout/header/Header';
import { useEffect, useMemo } from 'react';
import { useCampaignStore } from './stores/campaingStore';
import { data } from '@app/data/mock';
import Campaigns from './routes/campaigns/Campaigns';
import { useReceiverStore } from '@app/stores/receiversStore';
import Home from './routes/home/Home';
import Footer from '@components/layout/footer/Footer';
import EditCampaigns from './routes/campaign/[id]/EditCampaigns';
import CreateNewReceiverDialog from '@components/common/createNewReceiverDialog/CreateNewReceiverDialog';

function App() {
  const { populateCampaigns } = useCampaignStore();
  const { populateReceivers } = useReceiverStore();
  const PublicRoutes = useMemo(() => {
    return [
      { path: '/', component: <Home /> },
      { path: '/campaigns', component: <Campaigns /> },
      { path: '/campaign/:id', component: <EditCampaigns /> },
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
        <CreateNewReceiverDialog />
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
