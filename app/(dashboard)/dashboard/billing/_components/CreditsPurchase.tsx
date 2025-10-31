"use client";

import { authClient } from "@/lib/auth-client";
import { CreditsPack, PackId } from "@/app/types/billing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CoinsIcon, CreditCard } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const CreditsPurchase =  () => {
  const [selectedPack, setSelectedPack] = useState(PackId.MEDIUM);
  const [isLoading, setIsLoading] = useState(false);
   const handlePurchase = async () => {
    setIsLoading(true); 
    try { 
      const slugMap: Record<PackId, string> = {
        [PackId.LARGE]: "Large-Pack",
        [PackId.MEDIUM]: "Medium-Pack", 
        [PackId.SMALL]: "Small-Pack",
      };
      const slug = slugMap[selectedPack];  
      if (!slug) {
        toast.error("Invalid slug selection");
        setIsLoading(false);
        return;
      }

      const checkout = await authClient.checkout({
        slug: slug,  
      });

      if (checkout && checkout.data?.url) {
         toast.success("Redirecting to checkout...");
        window.location.href = checkout.data?.url;
       

      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to create checkout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-5 border border-primary/20 dark:border-primary/30 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <CoinsIcon className="h-6 w-6 text-primary" />
          Purchase Credits
        </CardTitle>
        <CardDescription>
          Select the number of credits you wish to purchase.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RadioGroup
          className="flex flex-col gap-3"
          onValueChange={(value) => setSelectedPack(value as PackId)}
          value={selectedPack}
        >
          {CreditsPack.map((pack) => (
            <Label
              key={pack.id}
              htmlFor={pack.id}
              className={`
                flex justify-between items-center cursor-pointer rounded-xl border 
                border-border/60 bg-card hover:bg-accent/40 transition-all duration-200
                p-4 peer-checked:ring-2 peer-checked:ring-primary
                dark:hover:bg-accent/20
              `}
              onClick={() => setSelectedPack(pack.id)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value={pack.id}
                  id={pack.id}
                  className="peer h-5 w-5 text-primary"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {pack.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {pack.label}
                  </span>
                </div>
              </div>
              <span className="font-semibold text-primary">
                ${(pack.price / 100).toFixed(2)}
              </span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={handlePurchase}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          {isLoading ? "Processing..." : "Purchase Credits"}
          
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditsPurchase;