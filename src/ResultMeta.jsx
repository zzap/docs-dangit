const ResultMeta = (result) => {
  const { code_creator, title, url } = result;
  return (
    <div className="flex justify-between">
      <p>{code_creator && <span>Created by {code_creator}</span>}</p>
      <p>
        {title?.length > 0 && (
          <a
            href={url}
            className="flex underline text-gray-700 hover:text-black"
          >
            {title?.length ? title : "Test"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 pl-1 -mt-px inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        )}
      </p>
    </div>
  );
};

export default ResultMeta;
