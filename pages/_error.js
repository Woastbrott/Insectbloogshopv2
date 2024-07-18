// /pages/_error.js

import React from 'react';

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `Ein Fehler ${statusCode} ist auf dem Server aufgetreten.`
        : 'Ein Fehler ist auf dem Client aufgetreten.'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
