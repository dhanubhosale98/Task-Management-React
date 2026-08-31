import { Field, FieldGroup } from "@/components/ui/field";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";

import React from "react";

import { Button } from "@/components/ui/button";
import api from "@/api/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export function Login() {
  const { user, login, logout } = useAuth();

  const navigate = useNavigate();
  let { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, []);

  async function onSubmit(data) {
    try {
      const result = await api.post(`/auth`, data);
      login(result.data.data,result.data.AccessToken)
      navigate("/dashboard");
      toast.add({
        title: "Login successfully",
      });
    } catch (error) {
      toast.add({
        title: "something went wrong",
      });
    }
  }

  return (
    <>
      <div>
        <Card className="w-full max-w-xs hover:shadow-sm hover:shadow-gray-700">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email", { required: "Email required" })}
                    placeholder="Enter Email"
                  />
                </Field>
                <Field>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password", {
                      required: "password Required",
                    })}
                    placeholder="********"
                  />
                </Field>

                <div className="flex justify-end gap-4 mt-4">
                  <Button type="submit">Login</Button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
