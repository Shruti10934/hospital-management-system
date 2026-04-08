"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    ShoppingCart,
    Plus,
    Minus,
    Pill,
    Shield,
    Package,
    AlertTriangle,
    CheckCircle,
    Info,
    Factory,
    Tag,
    Boxes,
    Truck,
    ShieldCheck,
    Clock,
    Star,
} from "lucide-react";
import { useCart } from "@/components/providers/cart-context";
import { MOCK_ITEMS, CATEGORY_CONFIG, getStockStatus } from "../_data/pharmacy-data";

export default function PharmacyItemPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart, getItemQuantity, updateQuantity, removeFromCart } = useCart();

    const item = useMemo(() => {
        return MOCK_ITEMS.find(i => i.id === params.id) ?? null;
    }, [params.id]);

    if (!item) {
        return (
            <div className="flex flex-col gap-6" id="pharmacy-item-not-found">
                <Card className="py-20">
                    <CardContent className="flex flex-col items-center justify-center text-center gap-4">
                        <div className="rounded-full bg-muted p-6">
                            <Pill className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-xl font-semibold">Item not found</h3>
                            <p className="text-muted-foreground max-w-sm">
                                The product you&apos;re looking for doesn&apos;t exist or has been removed.
                            </p>
                        </div>
                        <Button asChild className="mt-2 gap-2">
                            <Link href="/patient/pharmacy">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Pharmacy
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const catConfig = CATEGORY_CONFIG[item.category];
    const stock = getStockStatus(item.stock);
    const quantity = getItemQuantity(item.id);
    const isDisabled = item.stock === 0 || item.requiresPrescription;

    return (
        <div className="flex flex-col gap-6" id="pharmacy-item-page">
            {/* Breadcrumb navigation */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
                <span>/</span>
                <Link href="/patient/pharmacy" className="hover:text-primary transition-colors">
                    Pharmacy
                </Link>
                <span>/</span>
                <span className="text-foreground font-medium truncate">{item.name}</span>
            </div>

            {/* Product detail layout */}
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                {/* Left: Product info */}
                <div className="flex flex-col gap-6">
                    {/* Product header card */}
                    <Card className="overflow-hidden">
                        <div className={`h-1.5 bg-gradient-to-r ${catConfig.gradient}`} />
                        <CardContent className="p-6 sm:p-8">
                            {/* Badges row */}
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <Badge variant="outline" className={catConfig.color}>
                                    <catConfig.icon className="mr-1 h-3.5 w-3.5" />
                                    {catConfig.label}
                                </Badge>
                                {item.requiresPrescription && (
                                    <Badge
                                        variant="outline"
                                        className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                                    >
                                        <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                                        Prescription Required
                                    </Badge>
                                )}
                                <div className="ml-auto flex items-center gap-1.5">
                                    <span className={`h-2 w-2 rounded-full ${stock.dot}`} />
                                    <span className={`text-sm font-medium ${stock.class}`}>
                                        {stock.label}
                                        {item.stock > 0 && ` (${item.stock} available)`}
                                    </span>
                                </div>
                            </div>

                            {/* Product title */}
                            <h1 className="text-3xl font-bold tracking-tight mb-1">
                                {item.name}
                            </h1>
                            {item.strength && (
                                <p className="text-lg text-muted-foreground mb-4">
                                    {item.strength}
                                </p>
                            )}

                            {/* Price */}
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-4xl font-bold text-primary">
                                    ₹{parseFloat(item.price).toFixed(2)}
                                </span>
                                <span className="text-sm text-muted-foreground">inclusive of all taxes</span>
                            </div>

                            <Separator className="mb-6" />

                            {/* Meta grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {item.manufacturer && (
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                        <Factory className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Manufacturer</p>
                                            <p className="font-medium text-sm">{item.manufacturer}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                    <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Category</p>
                                        <p className="font-medium text-sm capitalize">{item.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                    <Boxes className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Stock</p>
                                        <p className={`font-medium text-sm ${stock.class}`}>
                                            {item.stock > 0 ? `${item.stock} units` : "Unavailable"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description card */}
                    {item.description && (
                        <Card>
                            <CardContent className="p-6 sm:p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Info className="h-5 w-5 text-primary" />
                                    <h2 className="text-lg font-semibold">Product Description</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Prescription notice */}
                    {item.requiresPrescription && (
                        <Card className="border-amber-500/30 bg-amber-500/5">
                            <CardContent className="p-6 flex gap-4">
                                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-1">
                                        Prescription Required
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        This item requires a valid prescription from a registered medical practitioner.
                                        Please upload your prescription during checkout or consult with your doctor
                                        through our appointment system.
                                    </p>
                                    <Button variant="outline" asChild className="mt-3 gap-2">
                                        <Link href="/patient/book-appointment">
                                            Book a Doctor Appointment
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Trust signals */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                            <div className="rounded-full bg-emerald-500/10 p-2.5">
                                <Truck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Free Delivery</p>
                                <p className="text-xs text-muted-foreground">On all orders</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                            <div className="rounded-full bg-blue-500/10 p-2.5">
                                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Genuine Products</p>
                                <p className="text-xs text-muted-foreground">100% authentic</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                            <div className="rounded-full bg-purple-500/10 p-2.5">
                                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Quick Dispatch</p>
                                <p className="text-xs text-muted-foreground">Within 24 hours</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Sticky add-to-cart panel */}
                <div className="lg:sticky lg:top-20 h-fit">
                    <Card className="overflow-hidden shadow-lg">
                        <div className={`h-1.5 bg-gradient-to-r ${catConfig.gradient}`} />
                        <CardContent className="p-6 space-y-5">
                            {/* Product summary */}
                            <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                {item.strength && (
                                    <p className="text-sm text-muted-foreground">{item.strength}</p>
                                )}
                                <p className="text-3xl font-bold text-primary mt-2">
                                    ₹{parseFloat(item.price).toFixed(2)}
                                </p>
                            </div>

                            <Separator />

                            {/* Stock status */}
                            <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${stock.dot}`} />
                                <span className={`text-sm font-medium ${stock.class}`}>
                                    {stock.label}
                                </span>
                            </div>

                            {/* Quantity + Add to Cart */}
                            {quantity > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <span className="text-sm font-medium">Quantity</span>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-9 w-9 rounded-full"
                                                onClick={() => {
                                                    if (quantity <= 1) removeFromCart(item.id);
                                                    else updateQuantity(item.id, quantity - 1);
                                                }}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center text-lg font-bold">
                                                {quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-9 w-9 rounded-full"
                                                onClick={() => updateQuantity(item.id, quantity + 1)}
                                                disabled={quantity >= item.stock}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-bold text-lg">
                                            ₹{(parseFloat(item.price) * quantity).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                            Added to cart
                                        </span>
                                    </div>

                                    <Button
                                        className="w-full h-12 gap-2 text-base"
                                        asChild
                                    >
                                        <Link href="/patient/cart">
                                            <ShoppingCart className="h-5 w-5" />
                                            View Cart
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Button
                                        className="w-full h-12 gap-2 text-base"
                                        disabled={isDisabled}
                                        onClick={() => addToCart(item)}
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        {item.stock === 0
                                            ? "Out of Stock"
                                            : item.requiresPrescription
                                                ? "Prescription Required"
                                                : "Add to Cart"}
                                    </Button>
                                    {!isDisabled && (
                                        <p className="text-xs text-center text-muted-foreground">
                                            Free delivery • Secure checkout
                                        </p>
                                    )}
                                </div>
                            )}

                            <Separator />

                            {/* Quick links */}
                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full gap-2"
                                    asChild
                                >
                                    <Link href="/patient/pharmacy">
                                        <ArrowLeft className="h-4 w-4" />
                                        Continue Shopping
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
