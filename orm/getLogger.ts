import colorize from "json-colorizer"
import winston, { format } from "winston"

const prettify = format((info: any): any => {
  const message = colorize(info?.message?.body || null, {
    colors: {
      BRACE: "#E6DB74",
      BRACKET: "#FC4383FF",
      COLON: "#7F7F7FFF",
      COMMA: "#7F7F7FFF",
      STRING_KEY: "#E6DB74",
      STRING_LITERAL: "#FFB1F2",
      NUMBER_LITERAL: "#37E5E7",
      BOOLEAN_LITERAL: "#E6DB74",
      NULL_LITERAL: "#00A7AA",
    },
    pretty: true,
  })

  // this is a hack to get the colorized json to work
  // winston doesn't support colorizing json keys and values
  console.log(message)

  return false
})

export default async function getLogger() {
  const logger = await winston.createLogger()

  const ConsoleTransport = new winston.transports.Console({
    level: "silly",
    format: prettify(),
  })
  logger.add(ConsoleTransport)

  return logger
}
