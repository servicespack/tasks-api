import { app } from './app'

async function main (): Promise<void> {
  const {
    PORT = 3000
  } = process.env

  app.listen(PORT)
}

main()
  .catch(console.error)
