import { createFileRoute } from '@tanstack/react-router'
// Mantenha os seus imports de imagem corretos aqui
import cherryTop from '@/assets/cherry.png' 
import cherryBackground from '@/assets/cherry-frame.png' 

export const Route = createFileRoute('/')({
  component: ConviteIndex,
})

function ConviteIndex() {
  return (
    <div className="min-h-screen bg-[#fff0f3] flex items-center justify-center p-4 py-16">
      
      <main className="relative max-w-[380px] w-full bg-white rounded-[2.5rem] shadow-sm pb-10 mt-6 text-center flex flex-col items-center">
        
        {/* Imagem das Cerejas Penduradas no Topo Absoluto (Opcional, se ainda quiser manter) */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <img
            src={cherryTop}
            alt="Cerejas no topo"
            className="w-24 drop-shadow-sm" 
          />
        </div>

        {/* Imagem Floral alinhada APENAS ao topo do cartão */}
        <div className="absolute top-0 left-0 w-full overflow-hidden rounded-t-[2.5rem] z-0 pointer-events-none">
          <img 
            src={cherryBackground} 
            alt="Fundo floral topo" 
            className="w-full h-auto object-cover opacity-90" 
          />
        </div>

        {/* 
          Conteúdo Principal (z-10)
          ALTERAÇÃO AQUI: Mudámos de pt-16 para pt-40 para empurrar o texto para baixo da imagem!
          Se ainda ficar apertado, mude para pt-44. Se ficar muito longe, mude para pt-32.
        */}
        <div className="relative z-10 w-full px-6 pt-40 flex flex-col items-center">
          
          <p className="text-[10px] tracking-[0.2em] text-[#a48a8a] uppercase mb-1">
            Você está convidado
          </p>
          
          <h1 className="text-4xl font-serif italic text-[#c13a3a] mb-6 drop-shadow-sm">
            Chá de Bebê da Maitê
          </h1>
          
          <div className="relative w-[110%] bg-[#c13a3a] text-white py-2.5 mb-8 shadow-sm">
             <p className="text-sm font-medium tracking-wide">domingo, 6 de dezembro · às 15h</p>
          </div>

          <h2 className="text-3xl font-serif italic text-[#4a4a4a] mb-4">Olá, Maria!</h2>
          
          <p className="text-[#7a6f6f] text-sm leading-relaxed mb-8 px-4">
            Será uma alegria ter você conosco nesse momento tão doce.
          </p>

          <div className="w-full border border-[#e6b8b8] border-dashed rounded-2xl p-4 bg-white/80 backdrop-blur-sm mb-6">
            <p className="text-[10px] text-[#a48a8a] uppercase mb-2 tracking-wider">Sua Sugestão de Presente É</p>
            <div className="text-[#c13a3a] font-medium flex items-center justify-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
               </svg>
               Pacote de fraldas tamanho P
            </div>
          </div>

          <button className="w-full bg-[#da7474] hover:bg-[#c96262] text-white font-medium py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 mb-8 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Presença Confirmada!
          </button>

          <p className="text-xs text-[#a48a8a] mb-10">Avenida André Cavanha, 16 – Itapevi, SP</p>

          <div className="flex justify-center gap-8 w-full">
             <a 
                href="https://wa.me/5511900000000?text=Olá!%20Gostaria%20de%20falar%20sobre%20o%20chá%20de%20bebê%20da%20Maitê." 
                target="_blank" 
                rel="noreferrer" 
                className="flex flex-col items-center group cursor-pointer"
             >
                <div className="w-12 h-12 rounded-full border border-[#e6b8b8] text-[#c13a3a] flex items-center justify-center mb-2 group-hover:bg-[#fff0f3] transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <span className="text-[11px] text-[#7a6f6f]">WhatsApp</span>
             </a>
             <a 
                href="https://www.google.com/maps/search/?api=1&query=Avenida+André+Cavanha,+16+–+Itapevi,+SP" 
                target="_blank" 
                rel="noreferrer" 
                className="flex flex-col items-center group cursor-pointer"
             >
                <div className="w-12 h-12 rounded-full border border-[#e6b8b8] text-[#c13a3a] flex items-center justify-center mb-2 group-hover:bg-[#fff0f3] transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-[11px] text-[#7a6f6f]">Local</span>
             </a>
             <a 
                href="COLOQUE_AQUI_O_LINK_DA_LISTA" 
                target="_blank" 
                rel="noreferrer" 
                className="flex flex-col items-center group cursor-pointer"
             >
                <div className="w-12 h-12 rounded-full border border-[#e6b8b8] text-[#c13a3a] flex items-center justify-center mb-2 group-hover:bg-[#fff0f3] transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <span className="text-[11px] text-[#7a6f6f] leading-tight">Lista<br/>completa</span>
             </a>
          </div>

        </div>
      </main>
    </div>
  )
}