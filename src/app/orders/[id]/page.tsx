import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderDetails } from "@/components/orders/order-details";
import { fetchOrderByParam } from "@/lib/orders";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let order = null;
  let errorMsg: string | null = null;

  try {
    order = await fetchOrderByParam(id);
  } catch (e: any) {
    errorMsg = e?.message || "Unable to load order.";
  }

  if (!order && !errorMsg) return notFound();

  return (
    <main className="container mx-auto max-w-5xl p-4 md:p-6">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button asChild variant="ghost" className="px-0 h-auto text-sm">
          <Link href="/orders" aria-label="Back to orders">
            {"\u2190"} Back to orders
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <span>Order #{order?.documentId || order?.id || id}</span>
      </nav>

      {errorMsg ? (
        <div className="mt-4">
          <div>
            <p>Could not load order</p>
            <p className="whitespace-pre-wrap text-sm">{errorMsg}</p>
          </div>
        </div>
      ) : (
        <section className="mt-4">
          <OrderDetails order={order as any} />
        </section>
      )}
    </main>
  );
}
