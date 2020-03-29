const fs = require("fs");

function Logger (req, res, next) {
    const oldSend = res.send;

    const writeStream = fs.createWriteStream("./log.txt", { encoding: "utf8", flags: "a" });

    const chunks = [];

    res.send = (...restArgs) => {
        if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
        }
        const body = Buffer.concat(chunks).toString("utf8");

        const logData = {
            time: new Date().toUTCString(),
            fromIP: req.headers["x-forwarded-for"] ||
                req.connection.remoteAddress,
            method: req.method,
            originalUri: req.originalUrl,
            uri: req.url,
            responseData: body,
            referer: req.headers.referer || "",
            ua: req.headers["user-agent"]
        };
        const formattedData = `${JSON.stringify(logData)}\n`;
        writeStream.write(Buffer.from(formattedData));

        oldSend.apply(res, restArgs);
    };

    next();
}

module.exports = Logger;
