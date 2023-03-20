const ResultMeta = (result) => {
  const { source, code_creator, url } = result;
  const title = "captain_hook";
  const getSourceName = () => {
    switch (source) {
      case "reference":
      case "wordpress_reference":
        return "WP Code Reference";
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
    <div className="flex justify-between">
      <p>
        <a
          href={url}
          target="_blank"
          className="inline-flex items-center underline text-gray-700 hover:text-black"
        >
          {getSourceName()}
        </a>
        {code_creator && <span>, submitted by {code_creator}</span>}
      </p>
    </div>
  );
};

export default ResultMeta;
