import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="bg-black px-6 md:px-14 py-6 flex justify-end">
      <button 
        onClick={toggleLanguage}
        className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors cursor-pointer"
        dir="ltr"
      >
        <Globe size={20} />
        <span className="font-medium bg-gradient-to-r from-[#DBD6BA] to-[#949791] bg-clip-text text-transparent">
          {language === 'en' ? 'العربية' : 'English'}
        </span>
      </button>
    </header>
  );
};

export default Header;
