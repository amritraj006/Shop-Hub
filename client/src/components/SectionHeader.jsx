

const SectionHeader = ({ 
  icon: Icon, 
  badgeText, 
  title, 
  description, 
  className = "",
  badgeClassName = "",
  titleClassName = "",
  descriptionClassName = "" 
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {badgeText && (
        <div className={`inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4 ${badgeClassName}`}>
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          {badgeText}
        </div>
      )}
      {title && (
        <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 ${titleClassName}`}>
          {title}
        </h2>
      )}
      {description && (
        <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;