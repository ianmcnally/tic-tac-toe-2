import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'

const node = document.getElementById('root')!
const root = createRoot(node)
root.render(<App />)
