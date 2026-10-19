import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

import cherryTop from '@/assets/cherry.png' 
import cherryBackground from '@/assets/cherry-frame.png' 

export const Route = createFileRoute('/')({
  component: ConviteIndex,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string | undefined,
    }
  },
})

function ConviteIndex() {
  const { id } = Route.useSearch()
  
  const [guestName, setGuestName] = useState('Convidado(a)')
  const [guestGift, setGuestGift] = useState('carregando...')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirming, setIsConfirming] = useState(false)

  useEffect(() => {
    async function fetchGuest() {
      if (!id) {
        setIsLoading(false)
        return
      }
      
      if (supabase) {
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .eq('id', id)
          .single()

        if (data && !error) {
          setGuestName(data.name)
          setGuestGift(data.gift)
          setIsConfirmed(data.confirmed)
        }
      }
      setIsLoading(false)
    }
    
    fetchGuest()
  }, [id])

  const handleConfirm = async () => {
    if (!id || isConfirmed || !supabase) return
    
    setIsConfirming(true)
    
    const { error } = await supabase
      .from('guests')
      .update({ confirmed: true })
      .eq('id', id)

    if (!error) {
      setIsConfirmed(true)
    }
    setIsConfirming(false)
  }

  return (
    <div className="min-h-screen bg-[#fff0f3] flex items-center justify-center p-4 py-16">
      <main className="relative max-w-[380px] w-full bg-white rounded-[2.5rem] shadow-sm pb-10 mt-6 text-center flex flex-col items-center">
        
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <img src={cherryTop} alt="Cerejas no topo" className="w-24 drop-shadow-sm" />
        </div>

        <div className="absolute top-0 left-0 w-full overflow-hidden rounded-t-[2.5rem] z-0 pointer-events-none">
          <img src={cherryBackground} alt="Fundo floral topo" className="w-full h-auto object-cover opacity-90" />
        </div>

        <div className="relative z-10 w-full px-6 pt-40 flex flex-col items-center">
          
          <p className="font-['Montserrat'] text-[10px] tracking-[0.2em] text-[#a48a8a] uppercase mb-6">
            Você está convidado
          </p>
          
          <h1 className="mb-6 drop-shadow-sm flex flex-col items-center font-['Great_Vibes'] text-[#c13a3a] font-normal">
            <span className="text-[2.8rem] leading-none mb-2">Chá de Bebê da</span>
            <span className="text-[5rem] leading-none">Maitê</span>
          </h1>
          
          <div className="relative w-[110%] bg-[#c13a3a] text-white py-2.5 mb-8 shadow-sm">
             <p className="font-['Montserrat'] text-sm font-medium tracking-wide">domingo, 6 de dezembro · às 15h</p>
          </div>

          <h2 className="font-['Montserrat'] italic font-normal text-3xl text-[#4a4a4a] mb-4">
            Olá, {isLoading ? '...' : guestName}!
          </h2>
          
          <p className="font-['Montserrat'] italic font-medium text-[#7a6f6f] text-[1rem] leading-relaxed mb-8 px-4">
            Será uma alegria ter você conosco nesse momento tão doce.
          </p>

          <div className="w-full border border-[#e6b8b8] border-dashed rounded-2xl p-4 bg-white/80 backdrop-blur-sm mb-6">
            <p className="font-['Montserrat'] text-[10px] text-[#a48a8a] uppercase mb-2 tracking-wider">Sua Sugestão de Presente É</p>
            <div className="font-['Great_Vibes'] text-[#c13a3a] text-3xl font-normal flex items-center justify-center gap-3 mt-2">
               <svg className="w-4 h-4 text-[#e6b8b8]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
               {isLoading ? '...' : guestGift}
               <svg className="w-4 h-4 text-[#e6b8b8]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          </div>

          <button 
            onClick={handleConfirm}
            disabled={isConfirmed || isLoading || isConfirming || !id}
            className={`font-['Montserrat'] w-full font-medium py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 mb-8 shadow-sm ${
              isConfirmed 
                ? 'bg-emerald-500 text-white cursor-default' 
                : 'bg-[#da7474] hover:bg-[#c96262] text-white'
            }`}
          >
            {isConfirmed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {isConfirming ? 'A confirmar...' : isConfirmed ? 'Presença Confirmada!' : 'Confirmar Presença'}
          </button>

          <p className="font-['Montserrat'] text-xs text-[#a48a8a] mb-5">Avenida André Cavanha, 16 – Itapevi, SP</p>

          {/* ENFEITE FINAL COM CEREJA E CORAÇÕES */}
          <div className="flex items-center justify-center gap-2 w-full mb-8 opacity-80">
            <svg className="w-10 h-3 text-[#e6b8b8]" viewBox="0 0 50 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M0,10 Q15,-2 30,8 T50,8" />
            </svg>
            <svg className="w-2.5 h-2.5 text-[#da7474]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            
            <img src={cherryTop} alt="Cereja decorativa" className="w-8 drop-shadow-sm mx-1" />
            
            <svg className="w-2.5 h-2.5 text-[#da7474]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <svg className="w-10 h-3 text-[#e6b8b8]" viewBox="0 0 50 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ transform: 'scaleX(-1)' }}>
              <path d="M0,10 Q15,-2 30,8 T50,8" />
            </svg>
          </div>

          <div className="flex justify-center gap-8 w-full">
             <a href="https://wa.me/5511924554495?text=Olá!%20Gostaria%20de%20falar%20sobre%20o%20chá%20de%20bebê%20da%20Maitê." target="_blank" rel="noreferrer" className="flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-[#e6b8b8] text-[#c13a3a] flex items-center justify-center mb-2 group-hover:bg-[#fff0f3] transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <span className="font-['Montserrat'] text-[11px] text-[#7a6f6f]">WhatsApp</span>
             </a>
             <a href="https://www.google.com/maps/search/?api=1&query=Avenida+André+Cavanha,+16+–+Itapevi,+SP" target="_blank" rel="noreferrer" className="flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-[#e6b8b8] text-[#c13a3a] flex items-center justify-center mb-2 group-hover:bg-[#fff0f3] transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="font-['Montserrat'] text-[11px] text-[#7a6f6f]">Local</span>
             </a>
             <a href="COLOQUE_AQUI_O_LINK_DA_LISTA" target="_blank" rel="noreferrer" className="flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-[#e6b8b8] text-[#c13a3a] flex items-center justify-center mb-2 group-hover:bg-[#fff0f3] transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <span className="font-['Montserrat'] text-[11px] text-[#7a6f6f] leading-tight">Lista<br/>completa</span>
             </a>
          </div>

        </div>
      </main>
    </div>
  )
}