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
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    const initMap = async () => {
      try {
        if (typeof window === 'undefined') return;

        const ymaps3 = (window as any).ymaps3;
        if (!ymaps3) {
          console.warn('ymaps3 не загружен (еще).');
          return;
        }

        // Вызов ready как функции — возвращает промис
        if (typeof ymaps3.ready === 'function') {
          await ymaps3.ready();
        }

        const { YMap, YMapDefaultSchemeLayer, YMapMarker } = ymaps3;

        // Вычисляем центр всех магазинов (coords = [lon, lat])
        const centerLat = STORES.reduce((sum, store) => sum + store.coords[1], 0) / STORES.length;
        const centerLon = STORES.reduce((sum, store) => sum + store.coords[0], 0) / STORES.length;

        mapRef.current = new YMap(
          mapContainerRef.current!,
          {
            location: {
              center: [centerLon, centerLat],
              zoom: 10
            }
          }
        );

        mapRef.current.addChild(new YMapDefaultSchemeLayer());

        // Добавляем маркеры для всех магазинов
        STORES.forEach((store) => {
          const marker = new YMapMarker({
            coordinates: store.coords,
            properties: {
              balloonContent: `${store.name}<br/>${store.address}`
            }
          });
          mapRef.current.addChild(marker);
        });
      } catch (error) {
        console.error('Ошибка инициализации карты:', error);
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-light">Выберите магазин для получения карты</h2>
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
          <div ref={mapContainerRef} className="w-full h-full min-h-[360px]" />
        </div>

        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full border border-gray-200 text-black py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
