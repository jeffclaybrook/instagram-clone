"use client"

import { useState, useEffect } from "react"

function useMount() {
 const [mount, setMount] = useState(false)

 useEffect(() => {
  setMount(true)
 }, [mount])

 return mount
}

export default useMount