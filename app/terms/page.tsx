export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-muted mb-6">
            These Terms of Service govern your use of AfterAI. By using our service, you agree to these terms.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Service Description</h2>
          <p className="text-muted mb-6">
            AfterAI provides AI change intelligence services, including ACE capture, AURA assessments, and PACR records.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Acceptable Use</h2>
          <p className="text-muted mb-6">
            You agree to use AfterAI in compliance with all applicable laws and regulations.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data and Privacy</h2>
          <p className="text-muted mb-6">
            Your use of AfterAI is also governed by our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
