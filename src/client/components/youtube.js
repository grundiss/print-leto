import React from "react";

import style from "./youtube.css";

export default ({ id, className }) => (
  <div className={className}>
    <div className={style.wrapper}>
      <iframe
        className={style.iframe}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        gesture="media"
        allow="encrypted-media"
        allowFullScreen
      />
    </div>
  </div>
);
