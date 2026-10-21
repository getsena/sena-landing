import { clients } from '@/lib/data/clients'
import { Container } from './shared'

// Alto de cada logo para que pesen parecido en el muro (las proporciones de los archivos difieren).
const LOGO_HEIGHT: Record<number, string> = {
  0: 'h-[22px]',
  1: 'h-[34px]',
  6: 'h-[52px]',
  7: 'h-[26px]',
  8: 'h-[34px]',
}

export const Clients = () => (
  <section aria-labelledby="logos-titulo" className="border-b border-border-default">
    <Container className="py-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
      <h2 id="logos-titulo" className="m-0 text-[15px] font-bold">
        Empresas que ya cobran con Sena
      </h2>
      <div className="flex flex-wrap items-center gap-x-11 gap-y-6 flex-[1_1_560px] justify-start md:justify-end">
        {clients.map((client) => (
          <img
            key={client.id}
            src={client.logo}
            alt={client.name}
            className={`${LOGO_HEIGHT[client.id] ?? 'h-[34px]'} w-auto grayscale opacity-75`}
          />
        ))}
      </div>
    </Container>
  </section>
)
