import path from "path";
import fs from "fs";
import AWS from "aws-sdk";
import express from "express";
import bodyParser from "body-parser";
import React from "react";
import html from "./html";
import { Main } from "client/pages";
import { subsribeToUpdates } from "./db";

export default root => {
  AWS.config.loadFromPath(path.join(root, "aws.credentials.json"));
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });

  const app = express();
  app.use(bodyParser.json());

  if (process.env.NODE_ENV === "development") {
    app.use("/static", express.static(path.join(root, "dist/static")));
    app.use("/assets", express.static(path.join(root, "assets")));
  }

  app.get("/", (req, res) => {
    html(Main, "main", req.url).pipe(res);
  });

  app.post("/order", (req, res) => {
    const { name, email, phone, contactMethod } = req.body;

    ses.sendEmail(
      {
        Destination: {
          ToAddresses: ["grundiss@gmail.com"],
        },
        Message: {
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: `
              name = ${name};
              email = ${email};
              phone = ${phone};
              contact method = ${contactMethod};
            `,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "PrintLet/Lilenko Order",
          },
        },
        Source: "noreply@pryancat.ru",
      },
      function(err, data) {
        console.log("err = ", err);
        console.log("data = ", data);

        res.json({success: err === null});
      }
    );
  });

  if (process.env.SOCKET) {
    try {
      fs.unlinkSync(process.env.SOCKET);
    } catch (e) {}

    app.listen(process.env.SOCKET, () => {
      fs.chmodSync(process.env.SOCKET, "777");
      console.log(`App listening on socket ${process.env.SOCKET}!`);

      process.once("SIGINT", () => {
        console.log("SIGINT, shutting down process");
        fs.unlinkSync(process.env.SOCKET);
      });
    });
  } else {
    app.listen(3000, () => {
      console.log("Server is started on a port 3000");
    });
  }
};
