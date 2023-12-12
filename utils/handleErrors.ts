interface handleErrorParams {
  req?: any
  res: any
  err: unknown
  status?: string
  message?: string
}
export default async function handleErrors({
  req,
  res,
  err,
  status,
  message,
}: handleErrorParams) {
  const errors =
    typeof err === "object" && err.message ? err.message : String(err)

  console.error(err)
  res.status(status || 500).json({
    errors,
    message,
  })
}
