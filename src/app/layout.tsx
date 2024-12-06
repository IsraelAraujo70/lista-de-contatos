import { Metadata } from 'next'
import StoreProvider from '@/providers/StoreProvider'
import StyleProvider from '@/providers/StyleProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Lista de Contatos',
  description: 'Aplicação de gerenciamento de contatos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StoreProvider>
          <StyleProvider>
            {children}
            <ToastContainer position="bottom-right" />
          </StyleProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
