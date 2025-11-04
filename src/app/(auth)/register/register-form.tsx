"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formRegister = z.object({
  username: z.string().min(2),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});
type FormValue = z.infer<typeof formRegister>;
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
  const form = useForm<FormValue>({
    resolver: zodResolver(formRegister),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  function onsubmit(data: FormValue) {
    // fetch()
  }
  return (
    <div className="w-full flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="bg-background
                   placeholder:text-black placeholder:opacity-40
                   focus-visible:ring-white-500
                   focus:ring-amber-100 focus:border-0 "
                  />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    className="bg-background
                   placeholder:text-black placeholder:opacity-40
                   focus-visible:ring-white-500
                   focus:ring-amber-100 focus:border-0 "
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">ConfirmPassword</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ConfirmPassword"
                    {...field}
                    className="bg-background
                   placeholder:text-black placeholder:opacity-40
                   focus-visible:ring-white-500
                   focus:ring-amber-100 focus:border-0 "
                  />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-white text-black hover:bg-blue-600 hover:text-white"
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
}
