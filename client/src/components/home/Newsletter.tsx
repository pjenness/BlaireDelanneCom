import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      await apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutate(email);
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
            Subscribe to My Newsletter
          </h2>
          <p className="text-white/80 mb-8">
            Join me for exclusive content on hospitality, wedding design, travel experiences, and fashion insights delivered directly to your inbox.
          </p>
          
          <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-white/10 border border-white/20 focus:border-accent focus:outline-none text-white placeholder-white/50"
              required
            />
            <Button 
              type="submit" 
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-none uppercase tracking-wide font-medium transition duration-300"
              disabled={isPending}
            >
              {isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-white/60 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Blaire Delanne.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
