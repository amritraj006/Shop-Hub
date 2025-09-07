import { useState } from 'react';

const CardComponent = ({ 
  icon, 
  title, 
  description, 
  lightBg, 
  darkBg, 
  lightIcon, 
  darkIcon,
  gradient 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent via-transparent group-hover:via-blue-500/5 dark:group-hover:via-blue-500/10 rounded-2xl transition-all duration-500"></div>
      
      <div className="relative z-10">
        <div className={`w-20 h-20 rounded-2xl ${lightBg} ${darkBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <div className={`${lightIcon} ${darkIcon} transition-colors duration-300 ${isHovered ? `text-transparent bg-gradient-to-r ${gradient} bg-clip-text` : ''}`}>
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:dark:from-white group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardComponent;