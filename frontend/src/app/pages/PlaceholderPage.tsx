import PageShell from "../components/PageShell";

export default function PlaceholderPage({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <PageShell>
      <section
        className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-start justify-center px-6 py-24 md:px-10"
        style={{ fontFamily: "'Chivo', sans-serif" }}
      >
        <p className="text-[15px] font-light uppercase tracking-[0.3em] text-[#BFFD44]">{eyebrow}</p>
        <h1 className="mt-3 text-[56px] font-black uppercase leading-[0.95] text-white md:text-[88px]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] font-light leading-relaxed text-white/70">{desc}</p>
        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#BFFD44]/40 bg-[#BFFD44]/10 px-5 py-2 text-[14px] font-light text-[#BFFD44]">
          <span className="h-2 w-2 rounded-full bg-[#BFFD44]" />
          Segera hadir
        </span>
      </section>
    </PageShell>
  );
}
