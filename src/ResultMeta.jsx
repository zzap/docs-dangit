const ResultMeta = ({ source, code_creator, title, url }) => {
  const getSourceName = () => {
    switch (source) {
      case "reference":
      case "wordpress_reference":
        return "WP Code Reference";
        break;
      case "wordpress_dev_reference":
        return "WP Make Blog";
        break;
      case "wp-cli":
      case "wpcli":
        return "WP-CLI Docs";
        break;
      case "php":
      case "php_reference":
        return "PHP Docs";
        break;
    }
    return source;
  };

  return (
    <>
      {title && <h2 className="font-mono text-base mt-2 mb-1">{title}</h2>}
      <div className="flex justify-between">
        <p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center underline text-gray-700 hover:text-black"
          >
            {getSourceName()}
          </a>
          {code_creator && <span>, submitted by {code_creator}</span>}
        </p>
      </div>
    </>
  );
};

export default ResultMeta;
