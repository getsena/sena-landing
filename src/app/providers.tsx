'use client'

import { IpConfigInitializer } from '@/ui/shared/IpConfigInitializer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <IpConfigInitializer />
      {children}
    </QueryClientProvider>
  )
}
