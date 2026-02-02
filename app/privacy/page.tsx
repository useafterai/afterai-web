import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark/55 border-b border-white/8">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="AfterAI" width={28} height={28} className="h-7 w-auto" />
            <span className="text-xl font-bold">AfterAI</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-muted hover:text-white transition-colors text-sm">
              Home
            </Link>
          </div>
        </nav>
      </header>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-muted mb-6">
            AfterAI is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-muted mb-6">
            We collect information you provide directly, such as account information and AI change events (ACE) you log to our service.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-muted mb-6">
            We use your information to provide, maintain, and improve our services.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
          <p className="text-muted mb-6">
            We implement appropriate technical and organizational measures to protect your data.
          </p>
        </div>
      </div>
    </div>
  );
}
