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

const CreditsPurchase = () => {
  const [selectedPack, setSelectedPack] = useState(PackId.MEDIUM);
  const [isLoading, setIsLoading] = useState(false);

   const slugMap: Record<PackId, string> = {
    [PackId.LARGE]: "324905f4-9c29-498c-b4cc-e9c81491d167",
    [PackId.MEDIUM]: "993cdaee-f3d7-49c7-ba96-26247310ec5a",
    [PackId.SMALL]: "33e6841b9-7701-4982-b825-d34670c5e59d",
  };

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      const slug = slugMap[selectedPack];

      const checkout = await authClient.checkout({
        products: slug,  
      });

       
      const redirectUrl =
         typeof checkout === "object" &&
        checkout !== null &&
        "data" in checkout &&
        checkout.data &&
        typeof checkout.data === "object" &&
        "url" in checkout.data
          ? (checkout.data as { url: string }).url
          : typeof checkout === "object" && checkout !== null && "url" in checkout
          ? (checkout as unknown as { url: string }).url
          : undefined;

      console.log("Checkout response:", checkout);

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        throw new Error("Checkout did not return a redirect URL");
      }
    } catch (error) {
      console.error("Checkout failed", error);
      toast.error("Checkout failed. Please try again.");
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
