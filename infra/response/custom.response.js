module.exports = class CustomResponse {
  constructor() {}
  success = (res, status, data = null) => {
    return res.status(status).send(data || {});
  };
  failed = (res, status, data = null) => {
    return res.status(status).send(data || {});
  };
  sendPdf = (res, readStream) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
    readStream.pipe(res);
    readStream.on("error", (err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
  };
  sendExcel = (res, readStream) => {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=example.xlsx");
    readStream.pipe(res);
    readStream.on("error", (err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
  };
};
