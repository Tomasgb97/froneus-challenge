import { Route, Routes } from 'react-router-dom';
import Header from '@components/layout/header/Header';
import { useEffect, useMemo, useRef } from 'react';
import { useCampaignStore } from './stores/campaingStore';
import { data } from '@app/data/mock';
import Campaigns from './routes/campaigns/Campaigns';
import { useReceiverStore } from '@app/stores/receiversStore';
import Home from './routes/home/Home';
import Footer from '@components/layout/footer/Footer';
import EditCampaigns from './routes/campaign/[id]/EditCampaigns';
import CreateNewReceiverModal from '@components/common/createNewReceiverModal/CreateNewReceiverModal';
import { Toast } from 'primereact/toast';
import useToastStore from './stores/UI/toastStore';
import NewCampaign from './routes/campaigns/new/NewCampaign';
import { addLocale, locale } from 'primereact/api';

function App() {
  const { populateCampaigns } = useCampaignStore();
  const { populateReceivers } = useReceiverStore();
  const toastRef = useRef<Toast>(null);
  const { visible, message, severity, hideToast } = useToastStore();
  const PublicRoutes = useMemo(() => {
    return [
      { path: '/', component: <Home /> },
      { path: '/campaigns', component: <Campaigns /> },
      { path: '/campaigns/new', component: <NewCampaign /> },
      { path: '/campaign/:id', component: <EditCampaigns /> },
    ];
  }, []);

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
    today: 'Hoy',
    clear: 'Limpiar',
  });

  locale('es');

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

  useEffect(() => {
    if (visible && toastRef.current) {
      toastRef.current.show({
        severity,
        summary: message,
        life: 3000,
      });
      hideToast();
    }
  }, [visible, message, severity, hideToast]);

  return (
    <>
      <main className="min-h-dvh flex flex-col items-center justify-between">
        <Header />
        <CreateNewReceiverModal />
        <Toast ref={toastRef} />
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
