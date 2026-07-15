import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import PageShell from "../components/PageShell";
import { KARYA, TIM, DOSEN, type Anggota } from "../data/tim";
import logo3d from "../../assets/Logo 3DUTOPIA 2 tes.png";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function StatBlock({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="flex items-stretch gap-4">
      <span className="w-[3px] rounded-full" style={{ backgroundColor: accent }} />
      <div>
        <p className="text-[34px] font-black leading-none text-white">{value}</p>
        <p className="mt-1 text-[12px] font-light uppercase tracking-widest text-white/50">{label}</p>
      </div>
    </div>
  );
}

function ListGroup({ judul, items, accent }: { judul: string; items: string[]; accent: string }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
        {judul}
      </p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[14px] font-light leading-relaxed text-white/75">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnggotaCard({ a, index }: { a: Anggota; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <motion.article
      {...fadeUp}
      className={`flex flex-col gap-8 lg:items-center lg:gap-14 ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="relative mx-auto w-full max-w-[340px] shrink-0 lg:mx-0">
        <motion.div
          aria-hidden
          animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-8 -top-8 h-24 w-24 rounded-3xl opacity-25 blur-[2px]"
          style={{ backgroundColor: a.accent }}
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-9 -left-9 h-20 w-20 rounded-full opacity-20"
          style={{ backgroundColor: a.accent }}
        />
        <motion.div
          whileHover={{ scale: 1.04, rotate: reversed ? 1.5 : -1.5 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="relative overflow-hidden rounded-[26px] border-[3px] shadow-[0_28px_60px_-18px_rgba(0,0,0,0.75)]"
          style={{ borderColor: a.accent, boxShadow: `0 0 44px -12px ${a.accent}66` }}
        >
          <motion.img
            src={a.foto}
            alt={a.nama}
            className="aspect-[3/4] w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 to-transparent" />
          <span
            className="absolute bottom-4 left-4 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-black"
            style={{ backgroundColor: a.accent }}
          >
            {a.role}
          </span>
        </motion.div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-light uppercase tracking-[0.3em]" style={{ color: a.accent }}>
          {a.jurusan} · Angkatan {a.angkatan}
        </p>
        <h3
          className="mt-2 text-[36px] font-black uppercase leading-[0.95] text-white md:text-[52px]"
          style={{ fontFamily: "'Chivo', sans-serif" }}
        >
          {a.nama}
        </h3>

        <div className="mt-6 flex flex-col gap-5">
          <ListGroup judul={a.role === "Dosen Pembimbing" ? "Riset & Penelitian" : "Prestasi"} items={a.prestasi} accent={a.accent} />
          <ListGroup judul={a.role === "Dosen Pembimbing" ? "Pengalaman Mengajar" : "Project & Pengalaman"} items={a.project} accent={a.accent} />
          <ListGroup judul={a.role === "Dosen Pembimbing" ? "Publikasi & HKI" : "Organisasi"} items={a.organisasi} accent={a.accent} />
        </div>

        <div className="mt-8 flex flex-wrap gap-10 border-t border-white/10 pt-6">
          {a.prestasi.length > 0 && (
            <StatBlock value={String(a.prestasi.length)} label={a.role === "Dosen Pembimbing" ? "Top Riset" : "Prestasi"} accent={a.accent} />
          )}
          <StatBlock value={String(a.project.length)} label={a.role === "Dosen Pembimbing" ? "Mata Kuliah" : "Project"} accent={a.accent} />
          <StatBlock value="ITS" label="Institut Teknologi Sepuluh Nopember" accent={a.accent} />
        </div>
      </div>
    </motion.article>
  );
}

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <PageShell>
      <div style={{ fontFamily: "'Chivo', sans-serif" }}>
        <section className="mx-auto max-w-[1200px] px-6 pt-16 md:px-10">
          <motion.div {...fadeUp}>
            <p className="text-[15px] font-light uppercase tracking-[0.3em] text-[#BFFD44]">
              Tentang Karya · LIDM
            </p>
            <div className="mt-5 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
              <motion.img
                src={logo3d}
                alt="Logo 3DUTOPIA"
                className="h-28 w-auto md:h-36"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.08, rotate: -3 }}
              />
              <div>
                <h1 className="text-[56px] font-black uppercase leading-[0.9] text-white md:text-[84px]">
                  {KARYA.nama}
                </h1>
                <p className="mt-3 max-w-xl text-[15px] font-light italic leading-snug text-[#BFFD44]/90">
                  {KARYA.kepanjangan}
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-4xl text-[17px] font-light leading-relaxed text-white/75">
              {KARYA.deskripsi}
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {KARYA.fitur.map((f, i) => (
              <motion.div
                key={f.judul}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md transition-colors hover:border-[#BFFD44]/60"
              >
                <span className="text-[28px]">{f.icon}</span>
                <h3 className="mt-3 text-[18px] font-bold text-white">{f.judul}</h3>
                <p className="mt-2 text-[13.5px] font-light leading-relaxed text-white/60">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 pt-24 md:px-10">
          <motion.div {...fadeUp}>
            <p className="text-[15px] font-light uppercase tracking-[0.3em] text-[#ff5252]">
              Dosen Pembimbing
            </p>
            <h2 className="mt-3 text-[44px] font-black uppercase leading-[0.95] text-white md:text-[64px]">
              Pembimbing Akademik
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] font-light leading-relaxed text-white/65">
              Akademisi yang memberikan arahan teknis dan mengawasi jalannya pengembangan proyek inovasi pembelajaran ini.
            </p>
          </motion.div>
          <div className="mt-16 mb-24">
            <AnggotaCard a={DOSEN} index={0} />
          </div>

          <motion.div {...fadeUp}>
            <p className="text-[15px] font-light uppercase tracking-[0.3em] text-[#BFFD44]">
              Peserta LIDM
            </p>
            <h2 className="mt-3 text-[44px] font-black uppercase leading-[0.95] text-white md:text-[64px]">
              Tim di Balik 3DUTOPIA
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] font-light leading-relaxed text-white/65">
              Empat mahasiswa Institut Teknologi Sepuluh Nopember dengan latar belakang manufaktur,
              informatika, dan elektro — bersatu membangun lab praktikum virtual.
            </p>
          </motion.div>

          <div className="mt-16 flex flex-col gap-24">
            {TIM.map((a, i) => (
              <AnggotaCard key={a.id} a={a} index={i % 2 === 0 ? 1 : 0} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 pt-24 md:px-10">
          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-[#BFFD44]/25 bg-[#BFFD44]/[0.05] p-9 text-center"
          >
            <h3 className="text-[28px] font-black uppercase text-white md:text-[36px]">
              Siap mencoba praktikum virtualnya?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-[15px] font-light text-white/65">
              Jelajahi komponen mesin 3D, unduh modul, dan jalankan simulasi Embossing Machine —
              langsung dari browser atau headset VR.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/praktikum")}
              className="mt-6 rounded-full bg-[#BFFD44] px-8 py-3 text-[16px] font-bold text-black"
            >
              Mulai Praktikum →
            </motion.button>
          </motion.div>
        </section>
      </div>
    </PageShell>
  );
}
