import { z } from 'zod'

function todayDateString() {
  return new Date().toISOString().split('T')[0]
}

export const bookingFormSchema = z.object({
  name: z.string().trim().min(2, 'Συμπλήρωσε το ονοματεπώνυμο.'),
  email: z.string().trim().email('Συμπλήρωσε έγκυρο email.'),
  phone: z.string().trim().min(8, 'Συμπλήρωσε τηλέφωνο επικοινωνίας.'),
  eventType: z.string().trim().min(2, 'Επίλεξε είδος εκδήλωσης.'),
  date: z
    .string()
    .trim()
    .min(1, 'Επίλεξε ημερομηνία.')
    .refine((value) => value >= todayDateString(), 'Η ημερομηνία πρέπει να είναι από σήμερα και μετά.'),
  guests: z.coerce.number().int().min(1, 'Ελάχιστο 1 άτομο.').max(200, 'Μέγιστο 200 άτομα.'),
  message: z.string().trim().optional(),
  eventSlug: z.string().trim().optional(),
})

export type BookingFormValues = z.infer<typeof bookingFormSchema>
