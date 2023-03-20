const LanguageTag = (props) => {
  const { language } = props;
  return (
    <div className="flex items-end justify-end text-white text-sm font-mono p-4 h-full">
      <span className="bg-gray-500/80 p-2 rounded-lg">{language}</span>
    </div>
  );
};

export default LanguageTag;
