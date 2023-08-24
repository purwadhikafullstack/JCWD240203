import React from 'react'
import ContentLoader from 'react-content-loader'

const ThreeDots = props => (
  <ContentLoader
    height={50}
    width={200}
    backgroundColor="transparent"
    {...props}
  >
    <circle cx="55" cy="25" r="8" />
    <circle cx="100" cy="25" r="8" />
    <circle cx="145" cy="25" r="8" />
  </ContentLoader>
)

ThreeDots.metadata = {
  name: 'RioF',
  github: 'clariokids',
  description: 'Three Dots',
  filename: 'ThreeDots',
}

export default ThreeDots