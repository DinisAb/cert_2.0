import { useState, useEffect } from 'react';
import { Step1Nominal } from './Step1Nominal';
import { Step2Design } from './Step2Design';
import { Step3Checkout } from './Step3Checkout';
import { StepIndicator } from './StepIndicator';
import { StoresMap } from './StoresMap';
import { Certificate, Step } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
  onUpdateCertificate: (updates: Partial<Certificate>) => void;
  currentStep: Step;
  onNextStep: () => void;
  onPrevStep: () => void;
  onReset: () => void;
  certificateType: 'electronic' | 'physical' | null;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  certificate,
  onUpdateCertificate,
  currentStep,
  onNextStep,
  onPrevStep,
  onReset,
  certificateType
}) => {
  const [customAmountOpen, setCustomAmountOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const handleClose = () => {
    onReset();
    setCustomAmountOpen(false);
    setCustomAmount(null);
    onClose();
  };

  const handleSelectNominal = (amount: number) => {
    onUpdateCertificate({ nominal: amount });
    setCustomAmountOpen(false);
    setCustomAmount(null);
  };

  const handleToggleCustomAmount = () => {
    setCustomAmountOpen(!customAmountOpen);
    if (!customAmountOpen) {
      onUpdateCertificate({ nominal: null });
    }
  };

  const handleCustomAmountChange = (value: string) => {
    const amount = parseInt(value);
    setCustomAmount(amount || null);
    if (amount >= 500) {
      onUpdateCertificate({ nominal: amount });
    } else {
      onUpdateCertificate({ nominal: null });
    }
  };

  const handleNextStep = () => {
    const maxStep = certificate.isPhysicalCard ? 2 : 3;
    if (currentStep < maxStep) {
      onNextStep();
    } else {
      alert(
        `Спасибо за заказ! Карта на сумму ${certificate.nominal?.toLocaleString('ru-RU')} ₽ готова к покупке.`
      );
      handleClose();
    }
  };

  useEffect(() => {
    let isDisabled = true;

    if (currentStep === 1) {
      isDisabled = !certificate.nominal;
    } else if (currentStep === 2) {
      if (certificate.isPhysicalCard) {
        isDisabled = !certificate.senderName;
      } else {
        isDisabled = !certificate.background || !certificate.caption;
      }
    } else if (currentStep === 3) {
      isDisabled = !certificate.recipientPhone || !certificate.senderName;
    }

    setIsNextDisabled(isDisabled);
  }, [currentStep, certificate]);

  if (!isOpen) return null;

  const totalSteps = certificate.isPhysicalCard ? 2 : 3;

  return (
    <div className="fixed inset-0 z-50">
      <div className="modal-backdrop absolute inset-0" onClick={handleClose}></div>
      <div className="absolute inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg">
        <div className="modal-content bg-white rounded-2xl overflow-hidden h-full md:h-auto md:max-h-[90vh] flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {currentStep === 1 && (
              <Step1Nominal
                selectedNominal={certificate.nominal}
                onSelectNominal={handleSelectNominal}
                customAmountOpen={customAmountOpen}
                onToggleCustomAmount={handleToggleCustomAmount}
                customAmount={customAmount}
                onCustomAmountChange={handleCustomAmountChange}
              />
            )}

            {currentStep === 2 && !certificate.isPhysicalCard && (
              <Step2Design
                selectedBackground={certificate.background}
                onSelectBackground={bg => onUpdateCertificate({ background: bg })}
                selectedCaption={certificate.caption}
                onSelectCaption={caption => onUpdateCertificate({ caption })}
                customCaption={certificate.caption || ''}
                onCustomCaptionChange={caption => {
                  if (caption.trim()) {
                    onUpdateCertificate({ caption });
                  }
                }}
                selectedNominal={certificate.nominal}
              />
            )}

            {currentStep === 2 && certificate.isPhysicalCard && (
              <div>
                <h3 className="text-xl font-light mb-2">Ваше имя</h3>
                <p className="text-sm text-gray-500 mb-6">Как вас зовут?</p>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  value={certificate.senderName}
                  onChange={e => onUpdateCertificate({ senderName: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm mb-4"
                />
              </div>
            )}

            {currentStep === 3 && !certificate.isPhysicalCard && (
              <Step3Checkout
                nominal={certificate.nominal}
                recipientPhone={certificate.recipientPhone}
                onPhoneChange={phone => onUpdateCertificate({ recipientPhone: phone })}
                senderName={certificate.senderName}
                onNameChange={name => onUpdateCertificate({ senderName: name })}
                message={certificate.message}
                onMessageChange={msg => onUpdateCertificate({ message: msg })}
              />
            )}

            {currentStep === 2 && certificate.isPhysicalCard && !certificate.senderName && (
              <div className="text-center py-8">
                <p className="text-gray-500">Пожалуйста, введите ваше имя для продолжения</p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  className="flex-1 border border-gray-200 text-black py-4 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                  onClick={onPrevStep}
                >
                  Назад
                </button>
              )}
              <button
                className="flex-1 bg-black text-white py-4 rounded-xl text-sm hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={handleNextStep}
                disabled={isNextDisabled}
              >
                {currentStep === totalSteps ? 'Завершить' : 'Далее'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
