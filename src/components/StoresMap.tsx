import { useEffect, useRef } from 'react';
import { STORES } from '../types';

interface StoresMapProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  var ymaps3: any;
}

export const StoresMap: React.FC<StoresMapProps> = ({ isOpen, onClose }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    const initMap = async () => {
      try {
        if (typeof window !== 'undefined' && window.ymaps3) {
          await window.ymaps3.ready;
          const { YMap, YMapDefaultSchemeLayer, YMapMarker } = window.ymaps3;

          const map = new YMap(
            mapContainerRef.current!,
            {
              location: {
                center: [37.62, 55.75],
                zoom: 11
              }
            }
          );

          map.addChild(new YMapDefaultSchemeLayer());

          STORES.forEach(store => {
            const marker = new YMapMarker({
              coordinates: store.coords as [number, number],
              properties: { balloonContent: `${store.name}<br/>${store.address}` }
            });
            map.addChild(marker);
          });
        }
      } catch (error) {
        console.error('Ошибка инициализации карты:', error);
      }
    };

    initMap();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-light">Магазины UVI</h2>
          <button
            onClick={onClose}
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

        <div className="flex-1 overflow-hidden">
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        </div>

        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
