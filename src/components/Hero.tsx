interface HeroProps {
  onOpenElectronic: () => void;
  onOpenPhysical: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenElectronic, onOpenPhysical }) => {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center px-6 text-center">
      <div className="max-w-3xl">
        <p className="text-xs tracking-[0.3em] text-gray-500 mb-6 uppercase">
          UVI Jewelry
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Подарочные сертификаты
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-light mb-12">
          Выберите, какой сертификат вы хотите подарить
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Electronic Certificate */}
          <div className="border border-gray-200 rounded-xl p-8 hover:border-gray-400 transition-colors">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-2">Электронный сертификат</h3>
            <p className="text-sm text-gray-500 mb-6">
              Оформление и покупка на сайте, отправка в SMS
            </p>
            <button
              onClick={onOpenElectronic}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Купить
            </button>
          </div>

          {/* Physical Card */}
          <div className="border border-gray-200 rounded-xl p-8 hover:border-gray-400 transition-colors">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h10m4 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-2">Подарочная карта</h3>
            <p className="text-sm text-gray-500 mb-6">
              Оформление и покупка в магазинах UVI
            </p>
            <button
              onClick={onOpenPhysical}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Показать магазины
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
