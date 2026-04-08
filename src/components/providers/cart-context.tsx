"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface PharmacyItemData {
    id: string;
    name: string;
    strength: string | null;
    description: string | null;
    manufacturer: string | null;
    category: "medicine" | "equipment" | "consumables";
    imageUrl: string | null;
    price: string;
    requiresPrescription: boolean;
    stock: number;
    isActive: boolean;
}

export interface CartItem {
    item: PharmacyItemData;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: PharmacyItemData, quantity?: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (itemId: string) => number;
    cartCount: number;
    cartSubtotal: number;
    cartTax: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "healthsync_cart";
const TAX_RATE = 0.05;

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch {
            // Ignore parse errors
        }
        setIsHydrated(true);
    }, []);

    // Persist to localStorage on changes
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isHydrated]);

    const addToCart = useCallback((item: PharmacyItemData, quantity: number = 1) => {
        setItems(prev => {
            const existing = prev.find(ci => ci.item.id === item.id);
            if (existing) {
                return prev.map(ci =>
                    ci.item.id === item.id
                        ? { ...ci, quantity: Math.min(ci.quantity + quantity, ci.item.stock) }
                        : ci
                );
            }
            return [...prev, { item, quantity: Math.min(quantity, item.stock) }];
        });
    }, []);

    const removeFromCart = useCallback((itemId: string) => {
        setItems(prev => prev.filter(ci => ci.item.id !== itemId));
    }, []);

    const updateQuantity = useCallback((itemId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems(prev => prev.filter(ci => ci.item.id !== itemId));
            return;
        }
        setItems(prev =>
            prev.map(ci =>
                ci.item.id === itemId
                    ? { ...ci, quantity: Math.min(quantity, ci.item.stock) }
                    : ci
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const getItemQuantity = useCallback(
        (itemId: string) => {
            return items.find(ci => ci.item.id === itemId)?.quantity ?? 0;
        },
        [items]
    );

    const cartCount = items.reduce((sum, ci) => sum + ci.quantity, 0);
    const cartSubtotal = items.reduce(
        (sum, ci) => sum + parseFloat(ci.item.price) * ci.quantity,
        0
    );
    const cartTax = cartSubtotal * TAX_RATE;
    const cartTotal = cartSubtotal + cartTax;

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getItemQuantity,
                cartCount,
                cartSubtotal,
                cartTax,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
