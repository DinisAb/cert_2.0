import { useState } from 'react';
import { Hero } from './components/Hero';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { useCertificate } from './hooks/useCertificate';
import './styles/index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificateType, setCertificateType] = useState<'electronic' | 'physical' | null>(null);
  const {
    step,
    certificate,
    updateCertificate,
    nextStep,
    prevStep,
    reset
  } = useCertificate();

  const handleOpenElectronic = () => {
    setCertificateType('electronic');
    updateCertificate({ isPhysicalCard: false });
    setIsModalOpen(true);
  };

  const handleOpenPhysical = () => {
    setCertificateType('physical');
    updateCertificate({ isPhysicalCard: true });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCertificateType(null);
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
        certificateType={certificateType}
      />
    </div>
  );
}

export default App;
