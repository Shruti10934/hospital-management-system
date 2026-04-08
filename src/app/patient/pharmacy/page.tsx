"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    ShoppingCart,
    Plus,
    Minus,
    AlertTriangle,
    Factory,
} from "lucide-react";
import { useCart, type PharmacyItemData } from "@/components/providers/cart-context";
import { MOCK_ITEMS, CATEGORY_CONFIG, getStockStatus } from "./_data/pharmacy-data";

// ── Main page ─────────────────────────────────────────────────────────
export default function PharmacyPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const { addToCart, getItemQuantity, updateQuantity, removeFromCart } = useCart();

    const filteredItems = useMemo(() => {
        return MOCK_ITEMS.filter(item => {
            const matchesCategory = category === "all" || item.category === category;
            const matchesSearch =
                search === "" ||
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.manufacturer?.toLowerCase().includes(search.toLowerCase()) ||
                item.description?.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch && item.isActive;
        });
    }, [search, category]);

    return (
        <div className="flex flex-col gap-6" id="pharmacy-page">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Pharmacy</h1>
                <p className="text-muted-foreground">
                    Browse and order medicines, medical equipment, and consumables.
                </p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="pharmacy-search"
                        placeholder="Search medicines, equipment..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Tabs value={category} onValueChange={setCategory} className="w-full sm:w-auto">
                    <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="medicine">Medicine</TabsTrigger>
                        <TabsTrigger value="equipment">Equipment</TabsTrigger>
                        <TabsTrigger value="consumables">Consumables</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground">
                Showing {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
                {category !== "all" && ` in ${CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]?.label}`}
                {search && ` matching "${search}"`}
            </p>

            {/* Product grid */}
            {filteredItems.length === 0 ? (
                <Card className="py-16">
                    <CardContent className="flex flex-col items-center justify-center text-center gap-3">
                        <div className="rounded-full bg-muted p-4">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">No items found</h3>
                        <p className="text-muted-foreground max-w-sm">
                            Try adjusting your search or category filter to find what you&apos;re looking for.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredItems.map(item => (
                        <PharmacyCard
                            key={item.id}
                            item={item}
                            quantity={getItemQuantity(item.id)}
                            onAddToCart={() => addToCart(item)}
                            onIncrement={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                            onDecrement={() => {
                                const qty = getItemQuantity(item.id);
                                if (qty <= 1) removeFromCart(item.id);
                                else updateQuantity(item.id, qty - 1);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Product Card ──────────────────────────────────────────────────────
function PharmacyCard({
    item,
    quantity,
    onAddToCart,
    onIncrement,
    onDecrement,
}: {
    item: PharmacyItemData;
    quantity: number;
    onAddToCart: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
}) {
    const catConfig = CATEGORY_CONFIG[item.category];
    const stock = getStockStatus(item.stock);
    const isDisabled = item.stock === 0 || item.requiresPrescription;

    return (
        <Link href={`/patient/pharmacy/${item.id}`} className="block">
            <Card
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 cursor-pointer h-full"
            >
                {/* Category gradient strip */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${catConfig.gradient}`} />

                <CardContent className="p-5 flex flex-col gap-4 h-full">
                    {/* Top: category badge + stock */}
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className={catConfig.color}>
                            <catConfig.icon className="mr-1 h-3 w-3" />
                            {catConfig.label}
                        </Badge>
                        <div className="flex items-center gap-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${stock.dot}`} />
                            <span className={`text-xs font-medium ${stock.class}`}>
                                {stock.label}
                            </span>
                        </div>
                    </div>

                    {/* Item info */}
                    <div className="flex-1 space-y-1.5">
                        <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                            {item.name}
                        </h3>
                        {item.strength && (
                            <p className="text-sm text-muted-foreground">{item.strength}</p>
                        )}
                        {item.manufacturer && (
                            <p className="text-xs text-muted-foreground/80 flex items-center gap-1">
                                <Factory className="h-3 w-3" />
                                {item.manufacturer}
                            </p>
                        )}
                    </div>

                    {/* Prescription badge */}
                    {item.requiresPrescription && (
                        <Badge
                            variant="outline"
                            className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 w-fit text-xs"
                        >
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Rx Required
                        </Badge>
                    )}

                    {/* Price & Cart */}
                    <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-lg font-bold text-primary">
                            ₹{parseFloat(item.price).toFixed(2)}
                        </span>

                        <div onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
                            {quantity > 0 ? (
                                <div className="flex items-center gap-1.5">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7 rounded-full"
                                        onClick={onDecrement}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-6 text-center text-sm font-semibold">
                                        {quantity}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7 rounded-full"
                                        onClick={onIncrement}
                                        disabled={quantity >= item.stock}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    size="sm"
                                    className="h-8 gap-1.5 text-xs"
                                    disabled={isDisabled}
                                    onClick={onAddToCart}
                                >
                                    <ShoppingCart className="h-3.5 w-3.5" />
                                    Add
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
