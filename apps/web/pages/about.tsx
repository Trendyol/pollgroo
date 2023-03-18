import React from "react";
import { useForm } from "react-hook-form";
import { useFormik } from "formik";

export default function AboutPage() {
  console.log("useForm --->", useForm);
  console.log("useFormik --->", useFormik);
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}
