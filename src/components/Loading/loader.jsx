import XLviLoader from './xlviLoader'
import SunSpotLoader from './sunSpotLoader'
import { useLoading } from '../../hooks/useLoading'

const Loader = ({ isLoading }) => {
  const { showLoader, _, isFirstLoad } = useLoading(isLoading)

  return showLoader ? (
    <div
      data-cy='loader' // Add this for Cypress testing
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        zIndex: 9999
      }}
    >
      {isFirstLoad ? (
        <XLviLoader data-cy='xlvi-loader' /> // Add data-cy for XLviLoader
      ) : (
        <SunSpotLoader data-cy='sunspot-loader' /> // Add data-cy for SunSpotLoader
      )}
    </div>
  ) : null
}
export default Loader
