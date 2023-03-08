import { AppProps } from 'next/app'
import '../src/global-styles.css'

export default function MyApp({ Component, pageProps }:AppProps) {
  return <Component {...pageProps} />
}
