import ExternalLinkIcon from "./svg/ExternalLinkIcon";

const ResultMeta = (result) => {
  const { code_creator, title, url } = result;

  return (
    <div className="flex justify-between">
      <p>{code_creator && <span>Created by {code_creator}</span>}</p>
      <p>
        {title?.length > 0 && (
          <a
            href={url}
            className="flex items-center underline text-gray-700 hover:text-black"
          >
            {title?.length ? title : "Test"}
            <ExternalLinkIcon className="w-auto h-4 pl-1 -mt-px inline-block" />
          </a>
        )}
      </p>
    </div>
  );
};

export default ResultMeta;
