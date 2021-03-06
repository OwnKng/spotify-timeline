import styled from 'styled-components'
import Navigation from './styled/Navigation'

const Layout = ({ children, className }) => (
  <div className={className}>
    <Navigation />
    <main>
      {children}
    </main>
  </div>
)

export default styled(Layout)`

main {
  width: 95vw;
  margin: 0px auto;
  max-width: 1280px;
  padding: 0 2rem 4rem 2rem;
  
  @media only screen and (max-width: 500px) {
    padding: 0 0 4rem 0;
  }
}
`
