import React from 'react'
import { Heading, Center } from '@chakra-ui/core'
import Counter from '../components/Counter'

function CounterTab() {
  return (
    <>
      <Center>
        <Heading mb={50}>Counter with useState</Heading>
      </Center>
      <Counter />
    </>
  )
}

export default CounterTab
