import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

console.info('Setting up MSW handlers for browser environment')
for (const handler of handlers) {
  console.info(`Registered handler: ${handler.info.method} ${handler.info.path}`)
}

export const worker = setupWorker(...handlers)
