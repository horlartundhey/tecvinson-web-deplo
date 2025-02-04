const Card = ({ children, className = '' }) => {
    return (
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardContent = ({ children, className = '' }) => {
    return (
      <div className={`p-8 ${className}`}>
        {children}
      </div>
    );
  };
  
  export { Card, CardContent };