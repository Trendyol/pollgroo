import { Typography } from "@/../../packages/ui";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export default function AboutPage() {
  console.log(yup, useForm);
  return (
    <div>
      <h1>About Page</h1>
      <Typography size="xl" element="p">sd</Typography>
    </div>
  );
}
