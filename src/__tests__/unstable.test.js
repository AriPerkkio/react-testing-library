import * as React from 'react'

import {render, screen} from '../'

const COUNT = 100
const iterations = Array(COUNT)
  .fill(null)
  .map((_, n) => n)

const TIMEOUT = 10
const DIFF = 50

function Component() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const timer1 = setTimeout(() => setVisible(true), TIMEOUT)
    const timer2 = setTimeout(() => setVisible(false), TIMEOUT + DIFF)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return <div>{visible && <span>Content</span>}</div>
}

for (const i of iterations) {
  test(`unstable test ${1 + i}`, async () => {
    window.currentTest = `unstable test ${1 + i}`
    render(<Component />)

    const content = await screen.findByText('Content')
    expect(content).toBeInTheDocument()
  })
}
