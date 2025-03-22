import { logOutAction } from '@/app/action/auth'
import React from 'react'

const Todos = () => {
  return (
    <div>
      <h1>This is the TODO page</h1>

      <form action={logOutAction}>

      <input type="submit" value={'Logout'}/>
      </form>
    </div>
  )
}

export default Todos
