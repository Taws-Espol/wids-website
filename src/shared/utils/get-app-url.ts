export function getAppUrl() {
  return new URL(process.env.APP_URL?.split(",")[0] ?? "http://localhost:3000");
}
