"use client";

import { useState, useEffect } from "react";
import { Store, Bell, Shield, Wallet, Mail, Save, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "gadgets_admin_settings";

const defaultSettings = {
    store: {
        name: "Gadgets Store",
        email: "support@gadgetsstore.ng",
        phone: "+234 800 000 0000",
        location: "Lagos, Nigeria",
        description: "Your one-stop shop for all things tech in Nigeria.",
        maintenanceMode: false,
    },
    notifications: {
        newOrders: true,
        lowStock: true,
        newCustomer: false,
        paymentFailures: true,
        weeklyReport: false,
    },
    security: {
        twoFactor: false,
        loginAlerts: true,
    },
    payments: {
        paystackPublic: "",
        paystackSecret: "",
        flutterwavePublic: "",
        testMode: true,
    },
    email: {
        resendKey: "",
        fromAddress: "orders@gadgetsstore.ng",
        fromName: "Gadgets Store",
        orderConfirmations: true,
        shippingUpdates: true,
    },
};

type Settings = typeof defaultSettings;

const sections = [
    { id: "store", label: "Store Info", icon: Store },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "payments", label: "Payments", icon: Wallet },
    { id: "email", label: "Email", icon: Mail },
] as const;

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-accent" : "bg-white/20"}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} />
        </button>
    );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-6 py-5 border-b border-white/5 last:border-0">
            <div>
                <p className="font-medium text-white">{label}</p>
                {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
            </div>
            <div className="flex-shrink-0">{children}</div>
        </div>
    );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
    return (
        <div>
            <label className="text-sm text-neutral-400 block mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-accent transition-colors"
            />
        </div>
    );
}

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [activeSection, setActiveSection] = useState<typeof sections[number]["id"]>("store");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            const { data, error } = await supabase
                .from("admin_settings")
                .select("section, data");

            if (!error && data && data.length > 0) {
                const merged = { ...defaultSettings };
                data.forEach((row: any) => {
                    if (row.section in merged) {
                        (merged as any)[row.section] = { ...(merged as any)[row.section], ...row.data };
                    }
                });
                setSettings(merged);
            } else {
                // Fall back to localStorage if Supabase not yet configured
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    try { setSettings(JSON.parse(stored)); } catch {}
                }
            }
        };
        loadSettings();
    }, []);

    const update = <S extends keyof Settings>(section: S, key: keyof Settings[S], value: Settings[S][keyof Settings[S]]) => {
        setSettings((prev) => ({
            ...prev,
            [section]: { ...prev[section], [key]: value },
        }));
    };

    const handleSave = async () => {
        // Always sync maintenance flag immediately for the client-side gate
        localStorage.setItem("gadgets_maintenance", String(settings.store.maintenanceMode));

        // Save each section as its own row in Supabase
        const upserts = Object.entries(settings).map(([section, data]) => ({
            section,
            data,
            updated_at: new Date().toISOString(),
        }));

        const { error } = await supabase
            .from("admin_settings")
            .upsert(upserts, { onConflict: "section" });

        if (error) {
            // Fallback to localStorage if Supabase not yet configured
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const s = settings;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-1">
                    {sections.map((sec) => {
                        const Icon = sec.icon;
                        const isActive = activeSection === sec.id;
                        return (
                            <button
                                key={sec.id}
                                onClick={() => setActiveSection(sec.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                    isActive ? "bg-accent text-accent-foreground" : "text-neutral-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {sec.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="lg:col-span-3 p-8 rounded-2xl bg-white/5 border border-white/10 space-y-2">

                    {activeSection === "store" && (
                        <>
                            <h2 className="text-xl font-bold text-white mb-6">Store Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <Field label="Store Name" value={s.store.name} onChange={(v) => update("store", "name", v)} />
                                <Field label="Support Email" value={s.store.email} onChange={(v) => update("store", "email", v)} />
                                <Field label="Phone Number" value={s.store.phone} onChange={(v) => update("store", "phone", v)} />
                                <Field label="Location" value={s.store.location} onChange={(v) => update("store", "location", v)} />
                            </div>
                            <div className="mb-4">
                                <label className="text-sm text-neutral-400 block mb-2">Store Description</label>
                                <textarea
                                    rows={3}
                                    value={s.store.description}
                                    onChange={(e) => update("store", "description", e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-accent transition-colors resize-none"
                                />
                            </div>
                            <SettingRow label="Maintenance Mode" description="Temporarily disable the storefront for customers.">
                                <Toggle value={s.store.maintenanceMode} onChange={(v) => update("store", "maintenanceMode", v)} />
                            </SettingRow>
                        </>
                    )}

                    {activeSection === "notifications" && (
                        <>
                            <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                            <SettingRow label="New Order Alerts" description="Get notified when a customer places a new order.">
                                <Toggle value={s.notifications.newOrders} onChange={(v) => update("notifications", "newOrders", v)} />
                            </SettingRow>
                            <SettingRow label="Low Stock Warnings" description="Alert when a product's stock falls below 5 units.">
                                <Toggle value={s.notifications.lowStock} onChange={(v) => update("notifications", "lowStock", v)} />
                            </SettingRow>
                            <SettingRow label="New Customer Signup" description="Notify when a new user creates an account.">
                                <Toggle value={s.notifications.newCustomer} onChange={(v) => update("notifications", "newCustomer", v)} />
                            </SettingRow>
                            <SettingRow label="Payment Failures" description="Get instantly flagged when a transaction fails.">
                                <Toggle value={s.notifications.paymentFailures} onChange={(v) => update("notifications", "paymentFailures", v)} />
                            </SettingRow>
                            <SettingRow label="Weekly Analytics Report" description="Receive a weekly email summary of store performance.">
                                <Toggle value={s.notifications.weeklyReport} onChange={(v) => update("notifications", "weeklyReport", v)} />
                            </SettingRow>
                        </>
                    )}

                    {activeSection === "security" && (
                        <>
                            <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
                            <div className="space-y-4 mb-8">
                                {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                                    <Field key={label} label={label} value="" onChange={() => {}} type="password" placeholder="••••••••" />
                                ))}
                            </div>
                            <SettingRow label="Two-Factor Authentication" description="Require a verification code on every login.">
                                <Toggle value={s.security.twoFactor} onChange={(v) => update("security", "twoFactor", v)} />
                            </SettingRow>
                            <SettingRow label="Login Activity Alerts" description="Send an email on unrecognised login attempts.">
                                <Toggle value={s.security.loginAlerts} onChange={(v) => update("security", "loginAlerts", v)} />
                            </SettingRow>
                        </>
                    )}

                    {activeSection === "payments" && (
                        <>
                            <h2 className="text-xl font-bold text-white mb-6">Payment Configuration</h2>
                            <div className="space-y-4 mb-8">
                                <Field label="Paystack Public Key" value={s.payments.paystackPublic} onChange={(v) => update("payments", "paystackPublic", v)} placeholder="pk_live_..." />
                                <Field label="Paystack Secret Key" value={s.payments.paystackSecret} onChange={(v) => update("payments", "paystackSecret", v)} type="password" placeholder="sk_live_..." />
                                <Field label="Flutterwave Public Key" value={s.payments.flutterwavePublic} onChange={(v) => update("payments", "flutterwavePublic", v)} placeholder="FLWPUBK_TEST-..." />
                            </div>
                            <SettingRow label="Currency" description="All transactions are settled in Nigerian Naira.">
                                <span className="text-white font-bold bg-white/5 border border-white/10 px-4 py-2 rounded-lg">NGN (₦)</span>
                            </SettingRow>
                            <SettingRow label="Test Mode" description="Process test transactions without real charges.">
                                <Toggle value={s.payments.testMode} onChange={(v) => update("payments", "testMode", v)} />
                            </SettingRow>
                        </>
                    )}

                    {activeSection === "email" && (
                        <>
                            <h2 className="text-xl font-bold text-white mb-6">Email Settings</h2>
                            <div className="space-y-4 mb-8">
                                <Field label="Resend API Key" value={s.email.resendKey} onChange={(v) => update("email", "resendKey", v)} type="password" placeholder="re_..." />
                                <Field label="From Address" value={s.email.fromAddress} onChange={(v) => update("email", "fromAddress", v)} />
                                <Field label="From Name" value={s.email.fromName} onChange={(v) => update("email", "fromName", v)} />
                            </div>
                            <SettingRow label="Order Confirmations" description="Send an automated email when an order is placed.">
                                <Toggle value={s.email.orderConfirmations} onChange={(v) => update("email", "orderConfirmations", v)} />
                            </SettingRow>
                            <SettingRow label="Shipping Updates" description="Notify customers when their order status changes.">
                                <Toggle value={s.email.shippingUpdates} onChange={(v) => update("email", "shippingUpdates", v)} />
                            </SettingRow>
                        </>
                    )}

                    <div className="pt-6 flex justify-end">
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition-all ${
                                saved ? "bg-emerald-500 text-white" : "bg-accent text-accent-foreground hover:bg-accent/90"
                            }`}
                        >
                            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {saved ? "Saved!" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
