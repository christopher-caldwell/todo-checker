import * as esbuild from 'esbuild'

const main = async () => {
  try {
    await esbuild.build({
      entryPoints: ['src/index.ts', 'src/cli.ts', 'src/action.ts'],
      outdir: 'dist',
      bundle: false,
      minify: true,
      platform: 'node',
      target: 'node16',
      format: 'cjs',
    })
    process.exit()
  } catch (e) {
    process.exit(1)
  }
}

main()
