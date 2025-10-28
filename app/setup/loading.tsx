import Logo from "@/components/Logo";
import { Separator } from "@/components/ui/separator";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { Loader2Icon } from "lucide-react";

export default function loading() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
            <button
        type="button"
        className="flex items-center gap-2 cursor-pointer"
        >
        <IconInnerShadowTop className="!size-15" />
        <span className="text-5xl font-semibold">Flow</span>
    </button>
            <Separator className="max-w-xs dark:bg-white"/>
            <div className="flex items-center gap-2 justify-center">
                <Loader2Icon size={16} className="animate-spin stroke-primary"/>
                <p className="text-muted-foreground">Setting up your acccount</p>
            </div>
        </div>
    )
}