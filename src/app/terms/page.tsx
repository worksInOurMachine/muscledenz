export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
                    <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose prose-gray max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing and using this service, you accept and agree to be bound by the terms and provision of this
                            agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Permission is granted to temporarily use this service for personal, non-commercial transitory viewing
                            only. This is the grant of a license, not a transfer of title.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">3. Privacy Policy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                            service, to understand our practices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">4. Account Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account and password and for restricting
                            access to your device.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">5. Contact Information</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have any questions about these Terms of Service, please contact us at support@example.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}