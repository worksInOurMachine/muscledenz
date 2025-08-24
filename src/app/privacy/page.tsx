export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
                    <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose prose-gray max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We collect information you provide directly to us, such as when you create an account, use our services,
                            or contact us for support.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use the information we collect to provide, maintain, and improve our services, process transactions,
                            and communicate with you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We do not sell, trade, or otherwise transfer your personal information to third parties without your
                            consent, except as described in this policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We implement appropriate security measures to protect your personal information against unauthorized
                            access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">5. Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at privacy@example.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}