import React from "react";
import { Helmet } from "react-helmet";

const RTLWrapper = ({ children }) => {
  return (
    <>
      <Helmet>
        <html lang="ur" dir="rtl" />
        <style>{`
          body {
            direction: rtl;
            text-align: right;
          }
        `}</style>
      </Helmet>
      {children}
    </>
  );
};

export default RTLWrapper;
