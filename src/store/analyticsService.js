// Stub simples para evitar imports ausentes durante o modo DEMO
export const analyticsService = {
  trackEvent: (name, data = {}) => {
    try {
      console.debug(`[analytics] ${name}`, data)
    } catch {}
  }
}

export default analyticsService
