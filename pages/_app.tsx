import { Provider } from 'next-auth/client'
import { ThemeProvider } from 'styled-components'
import { theme } from '../components/styled/util'
import GlobalStyles from '../components/styled/GlobalStyles'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout pageTitle="GRAPHIX" description="data viz app">
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
