import React from "react";
import { useForm } from "react-hook-form";

export default function AboutPage() {
  console.log("useForm --->", useForm());
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}
