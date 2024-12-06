'use client'

import { GlobalStyles } from '@/styles/globalStyles'
import StyledComponentsRegistry from '@/lib/registry'

export default function StyleProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      {children}
    </StyledComponentsRegistry>
  )
}
