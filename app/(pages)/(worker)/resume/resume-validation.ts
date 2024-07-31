import { City } from "@prisma/client";
import { z } from "zod";

import { CITY_OPTIONS } from "@/components/constants";

export const ResumeSchema = z.object({
  text: z.string().min(10),
  country: z.string().min(10),
  city: z.enum([City.MOSCOW, City.SAINT_PETERSBURG, City.KRASNOYARSK]),
  namePosition: z.string().min(10),
  age: z.number().min(10),
});
