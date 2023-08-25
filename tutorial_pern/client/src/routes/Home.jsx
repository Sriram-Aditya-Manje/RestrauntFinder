import React from 'react'
import Header from '../Components/Header'
import AddRestraunt from '../Components/AddRestraunt'
import RestrauntsList from '../Components/RestrauntsList'

const Home = () => {
  return (
    <>
      <Header/>
      <AddRestraunt/>
      <RestrauntsList/>
    </>
  )
}

export default Home