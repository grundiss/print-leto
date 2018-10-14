import React from "react";
import ReactDOMServer from "react-dom/server";
import { PassThrough } from "stream";

const Html = ({ App, title = "lilenko.ru", bundleName, url }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/static/css/common.bundle.css" />
      <link rel="stylesheet" href={`/static/css/${bundleName}.bundle.css`} />
      <meta property="og:title" content="Ирина Лиленко" />
      <meta property="og:description" content="Эксперт краудфандинга" />
      <meta property="og:image" content="http://lilenko.ru/assets/lilenko.png" />
      <meta property="og:image:width" content="243" />
      <meta property="og:image:height" content="340" />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={`http://lilenko.ru${url}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      {process.env.NODE_ENV === "production" && (
        <React.Fragment>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function (d, w, c) {
                  (w[c] = w[c] || []).push(function() {
                      try {
                          w.yaCounter47376385 = new Ya.Metrika2({
                              id:47376385,
                              clickmap:true,
                              trackLinks:true,
                              accurateTrackBounce:true,
                              webvisor:true
                          });
                      } catch(e) { }
                  });
          
                  var n = d.getElementsByTagName("script")[0],
                      s = d.createElement("script"),
                      f = function () { n.parentNode.insertBefore(s, n); };
                  s.type = "text/javascript";
                  s.async = true;
                  s.src = "https://mc.yandex.ru/metrika/tag.js";
          
                  if (w.opera == "[object Opera]") {
                      d.addEventListener("DOMContentLoaded", f, false);
                  } else { f(); }
                })(document, window, "yandex_metrika_callbacks2");
            `,
            }}
          />
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/47376385"
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </React.Fragment>
      )}

      <div id="app" dangerouslySetInnerHTML={{ __html: ReactDOMServer.renderToString(<App />) }} />

      <script src="/static/js/common.bundle.js" />
      <script src={`/static/js/${bundleName}.bundle.js`} />
    </body>
  </html>
);

export default (App, bundleName, url) => {
  const resp = new PassThrough();

  resp.push("<!DOCTYPE html>", "utf8");

  ReactDOMServer.renderToStaticNodeStream(
    <Html bundleName={bundleName} App={App} url={url} />
  ).pipe(resp);

  return resp;
};
