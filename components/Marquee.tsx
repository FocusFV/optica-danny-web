export default function Marquee() {
  const text = " IMPROFLOW • ARGENTINA • MÉXICO • ";
  const block = Array(4).fill(text).join("");

  return (
    <div className="relative w-full overflow-hidden bg-[#c5a059] py-4 my-24 -skew-y-2 border-y-2 border-white/20 shadow-[0_0_50px_rgba(197,160,89,0.1)]">
      {/* ACÁ ESTÁ EL CAMBIO: le pusimos "cinta-infinita" */}
      <div className="flex whitespace-nowrap cinta-infinita w-max">
        <span className="text-black font-black text-4xl md:text-5xl uppercase tracking-[0.2em] px-2">{block}</span>
        <span className="text-black font-black text-4xl md:text-5xl uppercase tracking-[0.2em] px-2">{block}</span>
      </div>
    </div>
  );
}