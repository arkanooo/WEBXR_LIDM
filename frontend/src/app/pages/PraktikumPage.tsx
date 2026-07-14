import { useNavigate } from "react-router";
import PageShell from "../components/PageShell";

const OPSI = [
  {
    id: "pneumatik-hidrolik",
    nama: "Pneumatik & Hidrolik",
    desc: "Simulasi rangkaian katup, silinder, dan pengaturan tekanan.",
    accent: "#00cba0",
    sims: [
      {
        id: "embossing-machine",
        judul: "Embossing Machine",
        sub: "Percobaan 4 · One-Way Flow Control Valve",
        ready: true,
        vr: true,
      },
    ],
  },
  {
    id: "tensile-test",
    nama: "Tensile Test",
    desc: "Pengujian tarik material dengan kurva tegangan-regangan.",
    accent: "#fb7943",
    sims: [
      {
        id: "tensile-test",
        judul: "Tensile Test",
        sub: "ASTM E-8 · Universal Testing Machine",
        ready: true,
        vr: true,
      },
    ],
  },
];

// Aplikasi VR native (Unity) — dikembangkan terpisah sebagai Tugas Akhir,
// sudah terpasang & berjalan mandiri di headset Quest 2 lab. Bukan bagian
// dari kode website ini; ditautkan sebagai pengalaman VR penuh pelengkap
// simulasi berbasis browser di atas.
// packageId = application ID Android app yang sudah di-sideload (Unknown
// Sources) ke headset Quest 2 lab. Dipakai untuk membangun Android intent
// link agar tombol "Buka di Quest 2" bisa langsung meluncurkan app terpasang
// — TANPA perlu mengubah source code app itu sendiri.
const VR_NATIVE = [
  {
    id: "vr-embossing",
    judul: "VR Hydraulic Embossing Machine",
    penulis: "Arsyad Haniif Ananda · TA 2025",
    accent: "#00cba0",
    desc: "Pengalaman VR penuh: pasang komponen hidrolik satu per satu ke socket yang benar, gerakkan lever DCV, baca tekanan, dipandu narator robot.",
    fitur: ["XR Grab & Socket Interactor", "Fisika tekanan hidrolik nyata", "Narrative story robot pemandu"],
    validasi: "97,2% fitur lolos Black Box Testing · UEQ Excellent (36 responden)",
    packageId: "com.unity.template.vr",
  },
  {
    id: "vr-tensile",
    judul: "VR Uji Tarik ST37",
    penulis: "Dimas Arya Kautsar · TA 2022",
    accent: "#fb7943",
    desc: "Rekonstruksi VR dari pengujian tarik nyata di UTM ESH HCG-500 (500 kN): ambil spesimen, pasang di mesin, tarik hingga necking & putus.",
    fitur: ["Grabbable specimen", "Animasi necking → fracture", "Video grafik hasil uji nyata"],
    validasi: "Berbasis data uji tarik aktual — Yield 59,90 kN · UTS 66,40 kN",
    packageId: "com.DefaultCompany.AplikasiUjiTarikST42",
  },
];

/** Android intent link: meluncurkan app terpasang lewat activity utamanya
 *  berdasarkan package ID. Hanya berfungsi di browser berbasis Chromium
 *  Android (termasuk Meta Quest Browser) DAN hanya jika app dengan package
 *  ID tersebut memang sudah ter-install di perangkat yang membuka link ini. */
function launchIntent(packageId: string): string {
  return `intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=${packageId};end`;
}

export default function PraktikumPage() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <section className="mx-auto max-w-[1440px] px-6 pt-16 pb-8 md:px-10" style={{ fontFamily: "'Chivo', sans-serif" }}>
        <p className="text-[15px] font-light uppercase tracking-[0.3em] text-[#BFFD44]">
          Virtual Lab · WebXR
        </p>
        <h1 className="mt-3 text-[56px] font-black uppercase leading-[0.95] text-white md:text-[88px]">
          Praktikum
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] font-light leading-relaxed text-white/70">
          Ada dua cara menjalankan praktikum: <span className="text-white">simulasi cepat di browser</span>{" "}
          (di bawah) yang juga bisa dibuka langsung di headset lewat WebXR, atau{" "}
          <span className="text-white">aplikasi VR native</span> yang sudah terpasang di Quest 2 lab
          untuk pengalaman yang lebih imersif. Pelajari teorinya lebih dulu di halaman Modul.
        </p>

        <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#BFFD44]/40 bg-[#BFFD44]/10 px-5 py-2.5">
          <span className="text-[18px]">🌐</span>
          <span className="text-[13px] font-bold uppercase tracking-wide text-[#BFFD44]">
            Simulasi browser mendukung WebXR
          </span>
          <span className="text-[13px] font-light text-white/60">
            — buka di browser Quest 2 lalu tekan “Masuk VR”
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {OPSI.map((o) => (
            <div key={o.id} className="rounded-3xl border border-white/12 bg-white/[0.03] p-7 backdrop-blur-md">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: o.accent }} />
              <h2 className="mt-3 text-[28px] font-black leading-tight text-white">{o.nama}</h2>
              <p className="mt-2 text-[14px] font-light text-white/60">{o.desc}</p>

              <div className="mt-6 flex flex-col gap-3">
                {o.sims.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-black/25 p-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[12px] font-bold text-white/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      Segera hadir
                    </span>
                    <p className="mt-3 text-[13px] font-light text-white/45">
                      Simulasi percobaan {o.nama} sedang dikembangkan.
                    </p>
                  </div>
                ) : (
                  o.sims.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => navigate(`/praktikum/${s.id}`)}
                      className="group flex items-center justify-between rounded-xl border border-white/12 bg-black/25 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[#BFFD44]/70 hover:shadow-[0_0_32px_-8px_rgba(191,253,68,0.4)]"
                    >
                      <span>
                        <span className="flex items-center gap-2.5">
                          <span className="block text-[19px] font-bold text-white">{s.judul}</span>
                          {s.vr && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#BFFD44]/40 bg-[#BFFD44]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#BFFD44]">
                              🌐 WebXR
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-[13px] font-light text-white/50">{s.sub}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-[#BFFD44] px-4 py-2 text-[13px] font-bold text-black transition-transform group-hover:scale-105">
                        Mulai →
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Aplikasi VR native (Unity) — pengalaman penuh, terpasang di headset lab */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <span className="text-[22px]">🥽</span>
            <h2 className="text-[28px] font-black uppercase leading-tight text-white md:text-[34px]">
              Aplikasi VR Native — Quest 2
            </h2>
          </div>
          <p className="mt-3 max-w-3xl text-[15px] font-light leading-relaxed text-white/65">
            Selain simulasi di website, praktikum ini juga tersedia sebagai{" "}
            <span className="text-white">aplikasi VR mandiri berbasis Unity</span> yang sudah terpasang
            di headset Meta Quest 2 laboratorium — hasil pengembangan Tugas Akhir mahasiswa Teknik
            Mesin Industri ITS, dengan interaksi genggam penuh (grab &amp; socket), fisika hidrolik
            nyata, dan panduan narator. Buka dari <span className="text-white">App Library</span> di
            headset untuk mencobanya.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {VR_NATIVE.map((v) => (
              <div key={v.id} className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-md">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: v.accent }} />
                <h3 className="mt-3 text-[20px] font-bold leading-tight text-white">{v.judul}</h3>
                <p className="mt-1 text-[12px] font-light italic text-white/45">{v.penulis}</p>
                <p className="mt-3 text-[14px] font-light leading-relaxed text-white/70">{v.desc}</p>

                <ul className="mt-4 flex flex-col gap-1.5">
                  {v.fitur.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[13px] font-light text-white/60">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: v.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 rounded-lg border-l-2 bg-black/25 px-3 py-2 text-[12.5px] font-light leading-relaxed text-white/60" style={{ borderColor: v.accent }}>
                  ✓ {v.validasi}
                </p>

                <a
                  href={launchIntent(v.packageId)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold text-black transition-transform hover:scale-105"
                  style={{ backgroundColor: v.accent }}
                >
                  ▶ Buka di Quest 2
                </a>
                <p className="mt-3 font-mono text-[10.5px] font-light text-white/25">{v.packageId}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3 rounded-xl border border-[#FB7943]/25 bg-[#FB7943]/[0.06] px-4 py-3">
            <span className="text-[16px]">⚠️</span>
            <p className="text-[12.5px] font-light leading-relaxed text-white/60">
              Tombol <b className="text-white/80">“Buka di Quest 2”</b> hanya berfungsi bila halaman ini
              dibuka dari <b className="text-white/80">Meta Quest Browser pada headset yang sudah
              memiliki aplikasi tersebut ter-install</b> (via Unknown Sources). Di perangkat lain
              (termasuk headset tanpa app ini) tombol tidak akan bereaksi — gunakan simulasi berbasis
              browser di atas sebagai alternatif yang selalu berfungsi di mana pun.
            </p>
          </div>

          <p className="mt-4 text-[12px] font-light leading-relaxed text-white/35">
            Aplikasi VR native dikembangkan terpisah dari website ini menggunakan Unity 3D Engine.
            Source code proyek tidak lagi tersedia — hanya build aplikasi yang terpasang di headset
            lab. Simulasi berbasis browser di atas dibangun ulang secara independen agar praktikum
            tetap dapat diakses tanpa headset maupun instalasi.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
