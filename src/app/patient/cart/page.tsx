"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    ArrowLeft,
    ArrowRight,
    ShoppingBag,
    Pill,
    Shield,
    Package,
    Receipt,
} from "lucide-react";
import { useCart } from "@/components/providers/cart-context";

const CATEGORY_ICONS = {
    medicine: Pill,
    equipment: Shield,
    consumables: Package,
};

const CATEGORY_COLORS = {
    medicine: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    equipment: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    consumables: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
};

export default function CartPage() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTax,
        cartTotal,
    } = useCart();

    if (items.length === 0) {
        return (
            <div className="flex flex-col gap-6" id="cart-page">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">My Cart</h1>
                    <p className="text-muted-foreground">Review items before checkout.</p>
                </div>
                <Card className="py-20">
                    <CardContent className="flex flex-col items-center justify-center text-center gap-4">
                        <div className="rounded-full bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                            <ShoppingBag className="h-12 w-12 text-primary/60" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-xl font-semibold">Your cart is empty</h3>
                            <p className="text-muted-foreground max-w-sm">
                                Browse our pharmacy to find medicines, equipment, and consumables you need.
                            </p>
                        </div>
                        <Button asChild className="mt-2 gap-2">
                            <Link href="/patient/pharmacy">
                                <ShoppingCart className="h-4 w-4" />
                                Browse Pharmacy
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6" id="cart-page">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">My Cart</h1>
                    <p className="text-muted-foreground">
                        {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild className="gap-2">
                        <Link href="/patient/pharmacy">
                            <ArrowLeft className="h-4 w-4" />
                            Continue Shopping
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        className="gap-2 text-destructive hover:text-destructive"
                        onClick={clearCart}
                    >
                        <Trash2 className="h-4 w-4" />
                        Clear All
                    </Button>
                </div>
            </div>

            {/* Cart content layout */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Items list */}
                <div className="lg:col-span-2 flex flex-col gap-3">
                    {items.map(({ item, quantity }) => {
                        const CatIcon = CATEGORY_ICONS[item.category];
                        const lineTotal = parseFloat(item.price) * quantity;

                        return (
                            <Card
                                key={item.id}
                                className="group transition-all duration-200 hover:shadow-md"
                            >
                                <CardContent className="p-4 sm:p-5">
                                    <div className="flex gap-4">
                                        {/* Icon placeholder */}
                                        <div
                                            className={`hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${CATEGORY_COLORS[item.category]}`}
                                        >
                                            <CatIcon className="h-7 w-7" />
                                        </div>

                                        {/* Item details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold truncate">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.strength && `${item.strength} • `}
                                                        {item.manufacturer}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-3">
                                                {/* Quantity control */}
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full"
                                                        onClick={() => {
                                                            if (quantity <= 1)
                                                                removeFromCart(item.id);
                                                            else
                                                                updateQuantity(
                                                                    item.id,
                                                                    quantity - 1
                                                                );
                                                        }}
                                                    >
                                                        <Minus className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <span className="w-8 text-center font-semibold">
                                                        {quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                quantity + 1
                                                            )
                                                        }
                                                        disabled={quantity >= item.stock}
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <span className="text-xs text-muted-foreground ml-1">
                                                        ₹{parseFloat(item.price).toFixed(2)} each
                                                    </span>
                                                </div>

                                                {/* Line total */}
                                                <p className="font-bold text-primary text-lg">
                                                    ₹{lineTotal.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Order summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20">
                        <Card className="overflow-hidden">
                            <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/20" />
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Receipt className="h-5 w-5 text-primary" />
                                    Order Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Subtotal ({cartCount} item
                                            {cartCount !== 1 ? "s" : ""})
                                        </span>
                                        <span className="font-medium">
                                            ₹{cartSubtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            GST (5%)
                                        </span>
                                        <span className="font-medium">
                                            ₹{cartTax.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Delivery
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-xs"
                                        >
                                            Free
                                        </Badge>
                                    </div>
                                </div>

                                <div className="border-t pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-base">Total</span>
                                        <span className="font-bold text-xl text-primary">
                                            ₹{cartTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full gap-2 h-11 text-base"
                                    asChild
                                >
                                    <Link href="/patient/checkout">
                                        Proceed to Checkout
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    Taxes calculated at 5% GST
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
