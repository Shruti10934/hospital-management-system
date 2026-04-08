"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Package,
    Calendar,
    ChevronDown,
    ChevronUp,
    Pill,
    Shield,
    ShoppingBag,
    Hash,
    Clock,
    Box,
} from "lucide-react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────
interface MockOrderItem {
    name: string;
    category: "medicine" | "equipment" | "consumables";
    quantity: number;
    unitPrice: number;
}

interface MockOrder {
    id: string;
    date: string;
    status: "pending" | "placed" | "processed" | "completed" | "cancelled";
    items: MockOrderItem[];
    subtotal: number;
    tax: number;
    total: number;
}

// ── Mock data ─────────────────────────────────────────────────────────
const MOCK_ORDERS: MockOrder[] = [
    {
        id: "a7b3e2f1-49c8-4d3a-8e7f-1c2d3e4f5a6b",
        date: "2026-04-06T14:30:00",
        status: "pending",
        items: [
            { name: "Paracetamol 500mg", category: "medicine", quantity: 2, unitPrice: 35 },
            { name: "Cotton Bandage Roll", category: "consumables", quantity: 1, unitPrice: 45 },
        ],
        subtotal: 115,
        tax: 5.75,
        total: 120.75,
    },
    {
        id: "b8c4f3g2-5ad9-4e4b-9f8g-2d3e4f5a6b7c",
        date: "2026-04-03T10:15:00",
        status: "placed",
        items: [
            { name: "Digital Thermometer", category: "equipment", quantity: 1, unitPrice: 299 },
            { name: "Surgical Masks (50)", category: "consumables", quantity: 2, unitPrice: 199 },
            { name: "Hand Sanitizer 500ml", category: "consumables", quantity: 1, unitPrice: 149 },
        ],
        subtotal: 846,
        tax: 42.3,
        total: 888.3,
    },
    {
        id: "c9d5g4h3-6be0-5f5c-0g9h-3e4f5a6b7c8d",
        date: "2026-03-28T16:45:00",
        status: "completed",
        items: [
            { name: "Cetirizine 10mg", category: "medicine", quantity: 1, unitPrice: 42 },
            { name: "Omeprazole 20mg", category: "medicine", quantity: 1, unitPrice: 78 },
        ],
        subtotal: 120,
        tax: 6,
        total: 126,
    },
    {
        id: "d0e6h5i4-7cf1-6g6d-1h0i-4f5a6b7c8d9e",
        date: "2026-03-20T09:00:00",
        status: "cancelled",
        items: [
            { name: "Blood Pressure Monitor", category: "equipment", quantity: 1, unitPrice: 1899 },
        ],
        subtotal: 1899,
        tax: 94.95,
        total: 1993.95,
    },
];

// ── Status config ─────────────────────────────────────────────────────
const STATUS_CONFIG = {
    pending: {
        label: "Pending",
        class: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
        dot: "bg-amber-500",
    },
    placed: {
        label: "Placed",
        class: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
        dot: "bg-blue-500",
    },
    processed: {
        label: "Processed",
        class: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
        dot: "bg-purple-500",
    },
    completed: {
        label: "Completed",
        class: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
        dot: "bg-emerald-500",
    },
    cancelled: {
        label: "Cancelled",
        class: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
        dot: "bg-red-500",
    },
};

const CATEGORY_ICONS = {
    medicine: Pill,
    equipment: Shield,
    consumables: Package,
};

// ── Main page ─────────────────────────────────────────────────────────
export default function OrdersPage() {
    const [tab, setTab] = useState("all");

    const filteredOrders =
        tab === "all"
            ? MOCK_ORDERS
            : MOCK_ORDERS.filter(order => order.status === tab);

    return (
        <div className="flex flex-col gap-6" id="orders-page">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
                    <p className="text-muted-foreground">
                        Track and manage your pharmacy orders.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/patient/pharmacy">Order Again</Link>
                </Button>
            </div>

            {/* Tabs */}
            <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="grid w-full max-w-lg grid-cols-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="placed">Placed</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value={tab} className="mt-6">
                    {filteredOrders.length === 0 ? (
                        <Card className="py-16">
                            <CardContent className="flex flex-col items-center justify-center text-center gap-3">
                                <div className="rounded-full bg-muted p-4">
                                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold">No orders found</h3>
                                <p className="text-muted-foreground max-w-sm">
                                    {tab === "all"
                                        ? "You haven't placed any orders yet. Browse our pharmacy to get started."
                                        : `No ${tab} orders at the moment.`}
                                </p>
                                <Button asChild className="mt-2">
                                    <Link href="/patient/pharmacy">Browse Pharmacy</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filteredOrders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

// ── Order Card ────────────────────────────────────────────────────────
function OrderCard({ order }: { order: MockOrder }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const statusConfig = STATUS_CONFIG[order.status];
    const orderDate = new Date(order.date);

    return (
        <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
            {/* Status strip */}
            <div className={`h-1 ${statusConfig.dot}`} />

            <CardContent className="p-5">
                {/* Top row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 text-sm font-mono text-muted-foreground">
                                <Hash className="h-3.5 w-3.5" />
                                {order.id.substring(0, 8).toUpperCase()}
                            </div>
                            <Badge variant="outline" className={statusConfig.class}>
                                <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
                                {statusConfig.label}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {orderDate.toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                {orderDate.toLocaleTimeString("en-IN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Box className="h-3.5 w-3.5" />
                                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-primary">
                            ₹{order.total.toFixed(2)}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-muted-foreground"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? "Hide" : "Details"}
                            {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                    <div className="mt-4 pt-4 border-t space-y-3 animate-in slide-in-from-top-2 duration-200">
                        {/* Item list */}
                        <div className="rounded-lg bg-muted/30 overflow-hidden">
                            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 text-xs font-medium text-muted-foreground border-b">
                                <span>Item</span>
                                <span className="text-right">Qty</span>
                                <span className="text-right">Unit Price</span>
                                <span className="text-right">Total</span>
                            </div>
                            {order.items.map((item, idx) => {
                                const CatIcon = CATEGORY_ICONS[item.category];
                                return (
                                    <div
                                        key={idx}
                                        className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3 text-sm items-center border-b border-border/50 last:border-0"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <CatIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                                            <span className="truncate">{item.name}</span>
                                        </div>
                                        <span className="text-right text-muted-foreground">
                                            ×{item.quantity}
                                        </span>
                                        <span className="text-right text-muted-foreground">
                                            ₹{item.unitPrice.toFixed(2)}
                                        </span>
                                        <span className="text-right font-medium">
                                            ₹{(item.unitPrice * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-full sm:w-64 space-y-1.5 text-sm">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>₹{order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Tax</span>
                                    <span>₹{order.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-1.5">
                                    <span>Total</span>
                                    <span className="text-primary">₹{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
