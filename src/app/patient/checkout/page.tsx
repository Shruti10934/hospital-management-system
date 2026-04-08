"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    ClipboardList,
    MapPin,
    CreditCard,
    Receipt,
    Pill,
    Shield,
    Package,
    Smartphone,
    Banknote,
    ShoppingBag,
    PartyPopper,
} from "lucide-react";
import { useCart } from "@/components/providers/cart-context";

const CATEGORY_ICONS = {
    medicine: Pill,
    equipment: Shield,
    consumables: Package,
};

const STEPS = [
    { id: 1, label: "Review Order", icon: ClipboardList },
    { id: 2, label: "Delivery Details", icon: MapPin },
    { id: 3, label: "Payment", icon: CreditCard },
];

export default function CheckoutPage() {
    const router = useRouter();
    const {
        items,
        cartCount,
        cartSubtotal,
        cartTax,
        cartTotal,
        clearCart,
    } = useCart();

    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");

    // Delivery form state
    const [deliveryForm, setDeliveryForm] = useState({
        fullName: "John Doe",
        phone: "+91 98765 43210",
        address: "123, MG Road, Apartment 4B",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
    });

    // Redirect to cart if empty
    if (items.length === 0 && !showSuccess) {
        return (
            <div className="flex flex-col gap-6" id="checkout-page">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                    <p className="text-muted-foreground">Complete your purchase.</p>
                </div>
                <Card className="py-16">
                    <CardContent className="flex flex-col items-center justify-center text-center gap-4">
                        <div className="rounded-full bg-muted p-6">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">Your cart is empty</h3>
                        <p className="text-muted-foreground max-w-sm">
                            Add items from the pharmacy before proceeding to checkout.
                        </p>
                        <Button asChild className="mt-2">
                            <Link href="/patient/pharmacy">Browse Pharmacy</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handlePlaceOrder = () => {
        // Simulate order placement
        setShowSuccess(true);
        clearCart();
    };

    return (
        <div className="flex flex-col gap-6" id="checkout-page">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href="/patient/cart">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                </div>
                <p className="text-muted-foreground ml-10">
                    Complete your order in 3 easy steps.
                </p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-center gap-0 w-full max-w-2xl mx-auto">
                {STEPS.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-1.5 flex-1">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                    currentStep > step.id
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : currentStep === step.id
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-muted-foreground/30 text-muted-foreground"
                                }`}
                            >
                                {currentStep > step.id ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    <step.icon className="h-5 w-5" />
                                )}
                            </div>
                            <span
                                className={`text-xs font-medium text-center ${
                                    currentStep >= step.id
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                        {index < STEPS.length - 1 && (
                            <div
                                className={`h-0.5 flex-1 mx-2 mb-6 rounded-full transition-colors duration-300 ${
                                    currentStep > step.id
                                        ? "bg-primary"
                                        : "bg-muted-foreground/20"
                                }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main content */}
                <div className="lg:col-span-2">
                    {currentStep === 1 && (
                        <ReviewStep items={items} />
                    )}
                    {currentStep === 2 && (
                        <DeliveryStep
                            form={deliveryForm}
                            onChange={setDeliveryForm}
                        />
                    )}
                    {currentStep === 3 && (
                        <PaymentStep
                            paymentMethod={paymentMethod}
                            onChange={setPaymentMethod}
                        />
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-6">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            disabled={currentStep === 1}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                        {currentStep < 3 ? (
                            <Button
                                className="gap-2"
                                onClick={() => setCurrentStep(prev => prev + 1)}
                            >
                                Continue
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                className="gap-2"
                                onClick={handlePlaceOrder}
                            >
                                <CheckCircle className="h-4 w-4" />
                                Place Order — ₹{cartTotal.toFixed(2)}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Order summary sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20">
                        <Card className="overflow-hidden">
                            <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/20" />
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Receipt className="h-4 w-4 text-primary" />
                                    Order Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Item list preview */}
                                <div className="space-y-2 max-h-44 overflow-y-auto">
                                    {items.map(({ item, quantity }) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-muted-foreground truncate max-w-[60%]">
                                                {item.name} ×{quantity}
                                            </span>
                                            <span className="font-medium">
                                                ₹{(parseFloat(item.price) * quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-3 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{cartSubtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">GST (5%)</span>
                                        <span>₹{cartTax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Delivery</span>
                                        <Badge
                                            variant="outline"
                                            className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px]"
                                        >
                                            Free
                                        </Badge>
                                    </div>
                                </div>

                                <div className="border-t pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-bold text-lg text-primary">
                                            ₹{cartTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Success dialog */}
            <Dialog open={showSuccess} onOpenChange={() => {}}>
                <DialogContent showCloseButton={false} className="sm:max-w-md text-center">
                    <DialogHeader className="items-center">
                        <div className="rounded-full bg-emerald-500/10 p-4 mb-3 mx-auto">
                            <PartyPopper className="h-10 w-10 text-emerald-600" />
                        </div>
                        <DialogTitle className="text-2xl">Order Placed!</DialogTitle>
                        <DialogDescription className="text-base">
                            Your order has been placed successfully. You can track your order status in the orders section.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="rounded-lg bg-muted/50 p-4 text-sm">
                        <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Order ID</span>
                            <span className="font-mono font-medium">ORD-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated Delivery</span>
                            <span className="font-medium">3–5 Business Days</span>
                        </div>
                    </div>
                    <DialogFooter className="flex-col gap-2 sm:flex-col">
                        <Button className="w-full" onClick={() => router.push("/patient/orders")}>
                            View My Orders
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push("/patient/pharmacy")}
                        >
                            Continue Shopping
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// ── Step 1: Review ────────────────────────────────────────────────────
function ReviewStep({
    items,
}: {
    items: { item: { id: string; name: string; strength: string | null; manufacturer: string | null; category: "medicine" | "equipment" | "consumables"; price: string }; quantity: number }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Review Your Items
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {items.map(({ item, quantity }) => {
                        const CatIcon = CATEGORY_ICONS[item.category];
                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <CatIcon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.strength && `${item.strength} • `}
                                        {item.manufacturer} • Qty: {quantity}
                                    </p>
                                </div>
                                <p className="font-semibold shrink-0">
                                    ₹{(parseFloat(item.price) * quantity).toFixed(2)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

// ── Step 2: Delivery Details ──────────────────────────────────────────
interface DeliveryFormData {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

function DeliveryStep({
    form,
    onChange,
}: {
    form: DeliveryFormData;
    onChange: (form: DeliveryFormData | ((prev: DeliveryFormData) => DeliveryFormData)) => void;
}) {
    const update = (key: keyof DeliveryFormData, value: string) => {
        onChange((prev: DeliveryFormData) => ({ ...prev, [key]: value }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Delivery Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            value={form.fullName}
                            onChange={e => update("fullName", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            value={form.phone}
                            onChange={e => update("phone", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={form.address}
                            onChange={e => update("address", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            value={form.city}
                            onChange={e => update("city", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                            id="state"
                            value={form.state}
                            onChange={e => update("state", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input
                            id="pincode"
                            value={form.pincode}
                            onChange={e => update("pincode", e.target.value)}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// ── Step 3: Payment ───────────────────────────────────────────────────
function PaymentStep({
    paymentMethod,
    onChange,
}: {
    paymentMethod: string;
    onChange: (method: string) => void;
}) {
    const methods = [
        {
            id: "card",
            label: "Credit/Debit Card",
            description: "Visa, Mastercard, RuPay",
            icon: CreditCard,
        },
        {
            id: "upi",
            label: "UPI",
            description: "Google Pay, PhonePe, Paytm",
            icon: Smartphone,
        },
        {
            id: "cod",
            label: "Cash on Delivery",
            description: "Pay when you receive",
            icon: Banknote,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    {methods.map(method => (
                        <button
                            key={method.id}
                            type="button"
                            className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                                paymentMethod === method.id
                                    ? "border-primary bg-primary/5 shadow-sm"
                                    : "border-transparent bg-muted/30 hover:bg-muted/50"
                            }`}
                            onClick={() => onChange(method.id)}
                        >
                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
                                    paymentMethod === method.id
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                }`}
                            >
                                <method.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{method.label}</p>
                                <p className="text-sm text-muted-foreground">
                                    {method.description}
                                </p>
                            </div>
                            <div
                                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    paymentMethod === method.id
                                        ? "border-primary"
                                        : "border-muted-foreground/30"
                                }`}
                            >
                                {paymentMethod === method.id && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {paymentMethod === "card" && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 p-4 rounded-lg bg-muted/30 border">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input id="cardName" placeholder="John Doe" />
                        </div>
                    </div>
                )}

                {paymentMethod === "upi" && (
                    <div className="mt-6 p-4 rounded-lg bg-muted/30 border">
                        <div className="space-y-2">
                            <Label htmlFor="upiId">UPI ID</Label>
                            <Input
                                id="upiId"
                                placeholder="yourname@upi"
                            />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
