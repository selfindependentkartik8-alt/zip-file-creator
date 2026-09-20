"use client";

import { useState } from "react";
import JSZip from "jszip";

type SelectedFile = {
  id: string;
  file: File;
};

export default function Home() {
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const scrollToCreator = () => {
    document
      .getElementById("creator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const incoming = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      file,
    }));

    setFiles((current) => [...current, ...incoming]);
    setDownloaded(false);
  };

  const removeFile = (id: string) => {
    setFiles((current) => current.filter((item) => item.id !== id));
    setDownloaded(false);
  };

  const clearFiles = () => {
    setFiles([]);
    setDownloaded(false);
  };

  const createZip = async () => {
    if (!files.length) return;

    setLoading(true);
    setDownloaded(false);

    try {
      const zip = new JSZip();

      files.forEach(({ file }) => {
        zip.file(file.name, file);
      });

      const blob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6,
        },
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "krishaiworks-files.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      setDownloaded(true);
    } catch (error) {
      console.error("ZIP creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* ========================================================= */}
      {/* GOLD → BLACK BACKGROUND */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main primary golden area */}
        <div className="absolute inset-x-0 top-0 h-[950px] bg-gradient-to-b from-amber-300/45 via-yellow-500/25 to-black" />

        {/* Large golden glow */}
        <div className="absolute left-1/2 top-[-250px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-yellow-300/35 via-amber-400/25 to-orange-500/10 blur-[150px]" />

        {/* Left glow */}
        <div className="absolute left-[-220px] top-[420px] h-[500px] w-[500px] rounded-full bg-amber-400/15 blur-[150px]" />

        {/* Right glow */}
        <div className="absolute right-[-220px] top-[500px] h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[150px]" />

        {/* Smooth transition into black */}
        <div className="absolute inset-x-0 top-[550px] h-[1100px] bg-gradient-to-b from-transparent via-black/75 to-black" />

        {/* Lower black area */}
        <div className="absolute inset-x-0 top-[1300px] bottom-0 bg-black" />
      </div>

      {/* ========================================================= */}
      {/* NAVBAR */}
      {/* ========================================================= */}

      <nav className="relative z-30 mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-5">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-amber-300/20 bg-white/10 shadow-lg shadow-amber-500/10">
              <img
                src="/logo.png"
                alt="KrishAIWorks Logo"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-tight text-white sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[9px] font-medium tracking-wide text-zinc-500 sm:text-[10px]">
                AI Solutions That Work
              </p>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">

            <a
              href="#features"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-amber-300"
            >
              Features
            </a>

            <a
              href="#how"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-amber-300"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-amber-300"
            >
              FAQ
            </a>

            <button
              onClick={scrollToCreator}
              className="ml-2 rounded-xl border border-amber-300/20 bg-amber-400 px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-yellow-300 active:scale-95"
            >
              Try Now
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={scrollToCreator}
            className="rounded-xl border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/20 md:hidden"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-20 pt-20 text-center sm:px-8 sm:pt-24">

        <div className="rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-xs text-amber-200 shadow-lg shadow-amber-950/30 backdrop-blur-xl">
          📦 Simple ZIP File Creator
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-amber-400">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          Pack Files.
          <br />

          <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Download Together.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Select multiple files, organize them into one ZIP archive,
          and download everything together in seconds.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl">
            ⚡ Fast
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl">
            🔒 Private
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl">
            📱 Mobile Friendly
          </span>

        </div>

        {/* ========================================================= */}
        {/* ZIP CREATOR */}
        {/* ========================================================= */}

        <div
          id="creator"
          className="mt-12 w-full max-w-4xl scroll-mt-8"
        >
          <div className="rounded-[2rem] border border-amber-400/10 bg-zinc-950/60 p-5 text-left shadow-2xl shadow-amber-950/30 backdrop-blur-2xl sm:p-7">

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Create a ZIP Archive
              </h2>

              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                Select the files you want to pack together.
              </p>
            </div>

            {/* Upload Area */}

            <label
              htmlFor="file-upload"
              className="group flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-amber-400/25 bg-amber-400/[0.03] px-6 py-10 transition hover:border-amber-300/50 hover:bg-amber-400/[0.06]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-400/10 text-2xl shadow-lg shadow-amber-500/10">
                📁
              </div>

              <h3 className="mt-5 text-base font-semibold text-white">
                Choose files
              </h3>

              <p className="mt-2 text-center text-xs leading-6 text-zinc-500">
                Select multiple files from your device
              </p>

              <span className="mt-5 rounded-xl border border-amber-300/20 bg-amber-400/10 px-5 py-2.5 text-xs font-semibold text-amber-300 transition group-hover:bg-amber-400/20">
                Browse Files
              </span>

              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  handleFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>

            {/* FILE LIST */}

            {files.length > 0 && (
              <div className="mt-7">

                <div className="mb-4 flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                      Selected Files
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {files.length}{" "}
                      {files.length === 1 ? "file" : "files"} selected
                    </p>
                  </div>

                  <button
                    onClick={clearFiles}
                    className="text-xs font-medium text-zinc-500 transition hover:text-red-300"
                  >
                    Clear All
                  </button>

                </div>

                <div className="space-y-2">

                  {files.map(({ id, file }) => (
                    <div
                      key={id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-black/40 px-4 py-3 backdrop-blur-xl"
                    >

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-400/10 text-sm">
                          📄
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-zinc-200">
                            {file.name}
                          </p>

                          <p className="mt-0.5 text-[11px] text-zinc-600">
                            {formatFileSize(file.size)}
                          </p>
                        </div>

                      </div>

                      <button
                        onClick={() => removeFile(id)}
                        className="shrink-0 rounded-lg px-2 py-1 text-lg text-zinc-600 transition hover:bg-red-500/10 hover:text-red-300"
                        aria-label={`Remove ${file.name}`}
                      >
                        ×
                      </button>

                    </div>
                  ))}

                </div>
              </div>
            )}

            {/* CREATE ZIP */}

            <button
              onClick={createZip}
              disabled={!files.length || loading}
              className="mt-7 h-14 w-full rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 px-7 text-sm font-bold text-black shadow-xl shadow-amber-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-yellow-200 hover:via-amber-300 hover:to-orange-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {loading
                ? "📦 Creating ZIP..."
                : downloaded
                ? "✓ ZIP Downloaded"
                : "📦 Create & Download ZIP"}
            </button>

            <p className="mt-3 text-center text-xs text-zinc-600">
              Your files are processed locally in your browser.
            </p>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WHY USE IT */}
      {/* ========================================================= */}

      <section
        id="features"
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-10 px-5 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto inline-flex rounded-full border border-amber-400/10 bg-amber-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Why Use It
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            File management made{" "}
            <span className="text-amber-400">
              simple.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Everything you need to quickly combine files into
            one downloadable ZIP archive.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <FeatureCard
            icon="⚡"
            number="01"
            title="Fast"
            description="Create a ZIP archive from multiple files in just a few seconds."
          />

          <FeatureCard
            icon="🔒"
            number="02"
            title="Private"
            description="Your files stay inside your browser while the ZIP archive is created."
          />

          <FeatureCard
            icon="📦"
            number="03"
            title="Simple"
            description="Select your files, create the archive and download everything together."
          />

        </div>
      </section>

      {/* ========================================================= */}
      {/* HOW TO USE */}
      {/* ========================================================= */}

      <section
        id="how"
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-10 px-5 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto inline-flex rounded-full border border-amber-400/10 bg-amber-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            How To Use
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Three simple steps.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Turn multiple files into one ZIP archive instantly.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <StepCard
            number="01"
            title="Choose Files"
            description="Select one or multiple files from your device."
          />

          <StepCard
            number="02"
            title="Review Files"
            description="Check the selected files and remove anything you don't need."
          />

          <StepCard
            number="03"
            title="Create ZIP"
            description="Click Create & Download ZIP to download your archive."
          />

        </div>
      </section>

      {/* ========================================================= */}
      {/* FAQ */}
      {/* ========================================================= */}

      <section
        id="faq"
        className="relative z-10 mx-auto w-full max-w-3xl scroll-mt-10 px-5 py-24 sm:px-8"
      >

        <div className="text-center">

          <div className="mx-auto inline-flex rounded-full border border-amber-400/10 bg-amber-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            FAQ
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          <Faq
            question="Are my files uploaded anywhere?"
            answer="No. The ZIP archive is created directly inside your browser. Your selected files are not uploaded to a server."
          />

          <Faq
            question="Can I select multiple files?"
            answer="Yes. You can select multiple files at once and you can also add more files before creating the ZIP archive."
          />

          <Faq
            question="What file types are supported?"
            answer="You can add common documents, images, videos, audio files and other files supported by your device."
          />

          <Faq
            question="Is the ZIP creator free?"
            answer="Yes. You can create and download ZIP archives completely free."
          />

        </div>
      </section>

      {/* ========================================================= */}
      {/* PREMIUM CTA */}
      {/* ========================================================= */}

      <section className="relative z-10 mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">

        <div className="relative overflow-hidden rounded-[2rem] border border-amber-400/10 bg-gradient-to-br from-amber-950/50 via-zinc-950/80 to-black px-6 py-14 text-center shadow-2xl shadow-amber-950/30 backdrop-blur-xl sm:px-12">

          <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[120px]" />

          <div className="relative">

            <div className="mx-auto h-14 w-14 overflow-hidden rounded-2xl border border-amber-400/20 bg-white/10 shadow-lg shadow-amber-500/10">
  <img
    src="/logo.png"
    alt="KrishAIWorks Logo"
    className="h-full w-full object-cover"
  />
</div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              KrishAIWorks
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pack your files. Keep it simple.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
              Combine multiple files into one clean ZIP archive
              without complicated software.
            </p>

            <button
              onClick={scrollToCreator}
              className="mt-8 inline-flex rounded-xl bg-amber-400 px-7 py-3 text-sm font-semibold text-black shadow-xl shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-yellow-300 active:scale-95"
            >
              📦 Create ZIP
            </button>

          </div>
        </div>
      </section>
{/* ========================================================= */}
{/* FOOTER */}
{/* ========================================================= */}

<footer className="relative z-10 border-t border-white/5 px-5 py-10">

  {/* ========================================================= */}
  {/* RELATED TOOLS */}
  {/* ========================================================= */}

  <div className="mx-auto max-w-6xl">

    <div className="mb-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/70">
        Explore More
      </p>

      <h3 className="mt-2 text-xl font-semibold text-white">
        More File & Utility Tools
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Explore more useful tools from KrishAIWorks.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* PDF Compressor */}
      <a
        href="https://pdfcompressor.krishaiworks.com/"
        className="group rounded-2xl border border-amber-400/10 bg-white/[0.02] p-5 transition hover:border-amber-400/30 hover:bg-amber-400/[0.04]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-lg">
          📄
        </div>

        <h4 className="font-semibold text-white transition group-hover:text-amber-400">
          PDF Compressor
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Compress PDF files quickly while keeping their quality.
        </p>
      </a>

      {/* Image Resizer & Compressor */}
      <a
        href="https://imageresizercompressor.krishaiworks.com/"
        className="group rounded-2xl border border-amber-400/10 bg-white/[0.02] p-5 transition hover:border-amber-400/30 hover:bg-amber-400/[0.04]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-lg">
          🖼️
        </div>

        <h4 className="font-semibold text-white transition group-hover:text-amber-400">
          Image Resizer & Compressor
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Resize and compress images quickly for easier sharing.
        </p>
      </a>

      {/* QR Code Generator & Scanner */}
      <a
        href="https://qrcodegeneratorscanner.krishaiworks.com/"
        className="group rounded-2xl border border-amber-400/10 bg-white/[0.02] p-5 transition hover:border-amber-400/30 hover:bg-amber-400/[0.04]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-lg">
          🔳
        </div>

        <h4 className="font-semibold text-white transition group-hover:text-amber-400">
          QR Code Generator & Scanner
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Create and scan QR codes instantly with ease.
        </p>
      </a>

      {/* Password Generator */}
      <a
        href="https://passwordgenerator.krishaiworks.com/"
        className="group rounded-2xl border border-amber-400/10 bg-white/[0.02] p-5 transition hover:border-amber-400/30 hover:bg-amber-400/[0.04]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-lg">
          🔐
        </div>

        <h4 className="font-semibold text-white transition group-hover:text-amber-400">
          Password Generator
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Generate strong and secure passwords in seconds.
        </p>
      </a>

    </div>
  </div>

 {/* ========================================================= */}
{/* ORIGINAL FOOTER */}
{/* ========================================================= */}

<div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-7 border-t border-white/5 pt-10 sm:flex-row">

  {/* Brand */}

  <div className="flex items-center gap-3">

    <img
      src="/logo.png"
      alt="KrishAIWorks Logo"
      className="h-12 w-12 rounded-full border border-amber-400/20 object-cover shadow-lg shadow-amber-500/10"
    />

    <div>

      <p className="font-semibold text-white">
        KrishAIWorks
      </p>

      <p className="mt-1 text-xs text-zinc-600">
        AI Solutions That Work
      </p>

    </div>

  </div>

  {/* Instagram + Legal Links */}

  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">

    <a
      href="https://instagram.com/KrishAIWorks"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-zinc-500 transition hover:text-amber-400"
    >
      Instagram · @KrishAIWorks
    </a>

    <a
      href="https://krishaiworks.com/privacy-policy"
      className="text-sm text-zinc-500 transition hover:text-amber-400"
    >
      Privacy Policy
    </a>

    <a
      href="https://krishaiworks.com/terms-and-conditions"
      className="text-sm text-zinc-500 transition hover:text-amber-400"
    >
      Terms & Conditions
    </a>

  </div>

  {/* Copyright */}

  <div className="text-center sm:text-right">

    <p className="text-xs text-zinc-600">
      © {new Date().getFullYear()} KrishAIWorks
    </p>

    <p className="mt-1 text-xs text-zinc-700">
      Built with AI.
    </p>

  </div>

</div>

</footer>

    </main>
  );
}

/* ============================================================= */
/* FEATURE CARD */
/* ============================================================= */

function FeatureCard({
  icon,
  number,
  title,
  description,
}: {
  icon: string;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-zinc-950/60 p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-amber-400/20">

      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-400/5 blur-3xl transition group-hover:bg-amber-400/10" />

      <div className="relative">

        <div className="text-3xl">
          {icon}
        </div>

        <p className="mt-5 text-[10px] font-bold tracking-[0.25em] text-amber-500/60">
          {number}
        </p>

        <h3 className="mt-2 text-lg font-bold text-amber-300">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {description}
        </p>

      </div>

    </div>
  );
}

/* ============================================================= */
/* STEP CARD */
/* ============================================================= */

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/[0.06] bg-zinc-950/50 p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl">

      <p className="text-xs font-black tracking-[0.25em] text-amber-400">
        {number}
      </p>

      <h3 className="mt-5 font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* ============================================================= */
/* FAQ */
/* ============================================================= */

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/[0.06] bg-zinc-950/60 p-5 shadow-xl shadow-black/10 backdrop-blur-2xl">

      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">

        <span>
          {question}
        </span>

        <span className="text-xl text-amber-400 transition duration-300 group-open:rotate-45">
          +
        </span>

      </summary>

      <p className="mt-4 text-sm leading-7 text-zinc-500">
        {answer}
      </p>

    </details>
  );
}

/* ============================================================= */
/* FILE SIZE */
/* ============================================================= */

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  const size = bytes / Math.pow(1024, index);

  return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}