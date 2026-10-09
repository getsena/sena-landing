import { clients } from '@/lib/data/clients'

const track = [...clients, ...clients]

export const Clients = () => {
  return (
    <div className="bg-surface-secondary py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1280px] flex flex-col items-center gap-8 px-4">
        <p className="text-brand-primary-dark font-extrabold text-xl sm:text-4xl text-center">
          Empresas que ya cobran con Sena
        </p>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-secondary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-secondary to-transparent z-10" />

          <div className="flex items-center gap-16 w-max animate-logo-marquee">
            {track.map((client, index) => (
              <img
                key={`${client.name}-${index}`}
                src={client.logo}
                alt={client.name}
                className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
