import type { Plugin } from 'vite'
import { isUTSProxy } from '../uts'

export function uniUniModulesExtApiPlugin(): Plugin {
  return {
    name: 'uni:uni-modules_ext-api',
    apply: 'build',
    config() {
      return {
        build: {
          lib: false, // 不使用 lib 模式，lib模式会直接内联资源
          cssCodeSplit: false,
          rollupOptions: {
            preserveEntrySignatures: 'strict',
            input: JSON.parse(process.env.UNI_COMPILE_EXT_API_INPUT!),
            output: {
              format: 'es',
              banner: ``,
              entryFileNames: '[name].js',
            },
          },
        },
      }
    },
    load(id) {
      if (isUTSProxy(id)) {
        return ''
      }
    },
    generateBundle(_, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        console.log('fileName', fileName)
      })
    },
  }
}
