export const subsribeToUpdates = (ddbServiceInstance, { email, courseType }) =>
  new Promise((resolve, reject) => {
    ddbServiceInstance.putItem(
      {
        TableName: "lilenko_ru_subscribers",
        Item: {
          id: { S: "" + +new Date() },
          date: { S: new Date().toString() },
          email: { S: email },
          courseType: { S: courseType },
          env: { S: process.env.NODE_ENV },
        },
      },
      function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
