-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_stylistId_fkey" FOREIGN KEY ("stylistId") REFERENCES "Stylist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
