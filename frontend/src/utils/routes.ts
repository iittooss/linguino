const ERoute = {
  BATCH: '/batch',
  HOME: '/',
}

type Route = keyof typeof ERoute

export { ERoute, type Route }
