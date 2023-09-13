import { check } from '../src'

const main = async () => {
  const result = await check({
    pathToSource: './demo/example-source',
  })
  console.log('Number of files checked', result)
}

main()
