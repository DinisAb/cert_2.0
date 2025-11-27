import { useState } from 'react';
import { Hero } from './components/Hero';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { StoresMap } from './components/StoresMap';
import { useCertificate } from './hooks/useCertificate';
import './styles/index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStoresMapOpen, setIsStoresMapOpen] = useState(false);
  const {
    step,
    certificate,
    updateCertificate,
    nextStep,
    prevStep,
    reset
  } = useCertificate();

  const handleOpenElectronic = () => {
    updateCertificate({ isPhysicalCard: false });
    setIsModalOpen(true);
  };

  const handleOpenPhysical = () => {
    setIsStoresMapOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white text-black">
      <Hero onOpenElectronic={handleOpenElectronic} onOpenPhysical={handleOpenPhysical} />
      <FAQ />
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certificate={certificate}
        onUpdateCertificate={updateCertificate}
        currentStep={step}
        onNextStep={nextStep}
        onPrevStep={prevStep}
        onReset={reset}
      />
      <StoresMap isOpen={isStoresMapOpen} onClose={() => setIsStoresMapOpen(false)} />
    </div>
  );
}

export default App;
